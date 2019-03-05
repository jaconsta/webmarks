package dao

import (
  "context"
  "log"
  "time"

  "github.com/mongodb/mongo-go-driver/bson"
  "github.com/mongodb/mongo-go-driver/bson/primitive"
)
var authCollection = "auth"

type Auth struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  UserId *primitive.ObjectID `json:"userId"`
  Token string `json:"token"`
  ExpiresAt time.Time `json:"-"`
}

func (db *MongoDb) CreateToken(userId *primitive.ObjectID) (Auth, error) {
  collection := db.GetCollection(authCollection)

  token := "abc123"
  expiresAt := time.Now().Add(time.Hour * 24 * 1).UTC()

  auth := Auth{UserId: userId, Token: token, ExpiresAt: expiresAt}

  _, err := collection.InsertOne(context.TODO(), auth)
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return Auth{}, err
  }
  // id := res.InsertedID.(*primitive.ObjectID)
  // auth.ID = id
  return auth, nil
}

func (db *MongoDb) FindAuthByUserAndToken (userId *primitive.ObjectID, token string) (Auth, error) {
  collection := db.GetCollection(authCollection)
  filter := bson.M{"token": token, "userid": userId}

  var auth Auth
  err := collection.FindOne(context.TODO(), filter).Decode(&auth)
  if err != nil {
    log.Printf("Could not get Auth")
    return Auth{}, err
  }
  return auth, nil
}
