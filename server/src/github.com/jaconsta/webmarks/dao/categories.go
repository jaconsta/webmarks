package dao

import (
  "context"
  "log"

  "github.com/mongodb/mongo-go-driver/bson/primitive"
  "github.com/mongodb/mongo-go-driver/mongo/options"
)


type Category struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  Name string `json:"name"`
  UsedByUser []*primitive.ObjectID `-"` // private
}

type Categories struct {
  Categories []*Category `json:"categories"`
}

var categoriesCollection = "categories"

func (db *MongoDb) GetAllCategories () ([]*Category, error) {
  collection := db.GetCollection(categoriesCollection)
  findOptions := options.Find()

  var categories []*Category
  cursor, err := collection.Find(context.TODO(), findOptions)
  if err != nil {
    log.Printf("Error getting Sites ", err)
    return nil, err
  }

  // Decode cursor
  for cursor.Next(context.TODO()) {
    var category Category
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

  // categories := CAtegories{Sites: siteList}
  return categories, nil
}

func (db *MongoDb) AddCategory (category *Category) (id string, err error) {
  collection := db.GetCollection(categoriesCollection)

  res, err := collection.InsertOne(context.TODO(), category)  // First argument is the document _id
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return "", err
  }
  id = res.InsertedID.(primitive.ObjectID).Hex()
  return id, nil
}
