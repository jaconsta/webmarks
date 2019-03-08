package dao

import (
  "context"
  "log"

  "github.com/mongodb/mongo-go-driver/bson"
  "github.com/mongodb/mongo-go-driver/bson/primitive"
  "github.com/mongodb/mongo-go-driver/mongo/options"

  categoryModel "github.com/jaconsta/webmarks/models/category"
  "github.com/jaconsta/webmarks/models/collections"
)

func (db *MongoDb) GetAllCategories () ([]*categoryModel.Category, error) {
  collection := db.GetCollection(collections.CategoriesCollection)
  findOptions := options.Find()

  var categories []*categoryModel.Category
  cursor, err := collection.Find(context.TODO(), findOptions)
  if err != nil {
    log.Printf("Error getting Sites ", err)
    return nil, err
  }

  // Decode cursor
  for cursor.Next(context.TODO()) {
    var category categoryModel.Category
    err := cursor.Decode(&category)
    if err != nil {
      log.Printf("Error decoding Sites ", err)
      return nil, err
    }
    categories = append(categories, &category)
  }

  // In case something happened with the query
  if err = cursor.Err(); err != nil {
    log.Fatal(err)
  }
  cursor.Close(context.TODO())

  return categories, nil
}

func (db *MongoDb) AddCategory (category *categoryModel.Category) (id string, err error) {
  collection := db.GetCollection(collections.CategoriesCollection)

  res, err := collection.InsertOne(context.TODO(), category)  // First argument is the document _id
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return "", err
  }
  id = res.InsertedID.(primitive.ObjectID).Hex()
  return id, nil
}

func (db *MongoDb) FindUserCategories (userId *primitive.ObjectID) ([]*categoryModel.Category, error) {
  collection := db.GetCollection(collections.CategoriesCollection)
  filter := bson.M{"userid": userId}

  var categories []*categoryModel.Category
  cursor, err := collection.Find(context.TODO(), filter)
  if err != nil {
    log.Printf("Error getting Sites ", err)
    return nil, err
  }

  // Decode cursor
  for cursor.Next(context.TODO()) {
    var category categoryModel.Category
    err := cursor.Decode(&category)
    if err != nil {
      log.Printf("Error decoding Sites ", err)
      return nil, err
    }
    categories = append(categories, &category)
  }

  // In case something happened with the query
  if err = cursor.Err(); err != nil {
    log.Fatal(err)
  }
  cursor.Close(context.TODO())

  return categories, nil
}
