package dao

import (
  "context"
  "log"

  "github.com/mongodb/mongo-go-driver/bson"
  "github.com/mongodb/mongo-go-driver/bson/primitive"
//  "github.com/mongodb/mongo-go-driver/mongo/options"
)
var usersCollection = "users"

type User struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  Email string `json:"email"`
  FirstName string `json:"firstName"`
  LastName string `json:"lastName"`
}

func (db *MongoDb) RegisterUser (user *User) (id string, err error) {
  collection := db.GetCollection(usersCollection)

  res, err := collection.InsertOne(context.TODO(), user)
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return "", err
  }
  id = res.InsertedID.(primitive.ObjectID).Hex()
  return id, nil
}

func (db *MongoDb) FindUserByEmail (mail string) (User, error) {
  collection := db.GetCollection(usersCollection)
  filter := bson.M{"email": mail}

  var user User
  err := collection.FindOne(context.TODO(), filter).Decode(&user)
  if err != nil {
    log.Printf("Could not get User")
    return User{}, err
  }
  return user, nil
}
