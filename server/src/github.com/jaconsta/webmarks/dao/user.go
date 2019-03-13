package dao

import (
  "context"
  "log"

  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/bson/primitive"

  userModel "github.com/jaconsta/webmarks/models/user"
  "github.com/jaconsta/webmarks/models/collections"
)

func (db *MongoDb) RegisterUser (user *userModel.User) (id string, err error) {
  collection := db.GetCollection(collections.UsersCollection)

  res, err := collection.InsertOne(context.TODO(), user)
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return "", err
  }
  id = res.InsertedID.(primitive.ObjectID).Hex()
  return id, nil
}

func (db *MongoDb) FindUserByEmail (mail string) (userModel.User, error) {
  collection := db.GetCollection(collections.UsersCollection)
  filter := bson.M{"email": mail}

  var user userModel.User
  err := collection.FindOne(context.TODO(), filter).Decode(&user)
  if err != nil {
    log.Printf("Could not get User")
    return userModel.User{}, err
  }
  return user, nil
}
