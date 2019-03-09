package dao

import (
  "context"
  "log"
  "time"

  "github.com/mongodb/mongo-go-driver/bson"
  "github.com/mongodb/mongo-go-driver/bson/primitive"

  userModel "github.com/jaconsta/webmarks/models/user"
)
var authCollection = "auth"

func (db *MongoDb) CreateToken(userId *primitive.ObjectID) (userModel.Auth, error) {
  collection := db.GetCollection(authCollection)

  token := "abc123"
  expiresAt := time.Now().Add(time.Hour * 24 * 1).UTC()

  auth := userModel.Auth{UserId: userId, Token: token, ExpiresAt: expiresAt}

  _, err := collection.InsertOne(context.TODO(), auth)
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return userModel.Auth{}, err
  }

  return auth, nil
}

func (db *MongoDb) FindAuthByUserAndToken (userId *primitive.ObjectID, token string) (userModel.Auth, error) {
  collection := db.GetCollection(authCollection)
  filter := bson.M{"token": token, "userid": userId}

  var auth userModel.Auth
  err := collection.FindOne(context.TODO(), filter).Decode(&auth)
  if err != nil {
    log.Printf("Could not get Auth")
    return userModel.Auth{}, err
  }
  return auth, nil
}
