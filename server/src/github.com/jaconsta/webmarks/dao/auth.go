package dao

import (
  "context"
  "log"
  "math/rand"
  "time"

  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/bson/primitive"

  userModel "github.com/jaconsta/webmarks/models/user"
)
var authCollection = "auth"

const codeChars = "ABCDEFGHIJKLMNOPQRSTUVWXY1234567890"
var seededRand *rand.Rand = rand.New(
  rand.NewSource(time.Now().UnixNano()))

func GenerateRandomCode (n int) string {
  code := make([]byte, n)
  for index := range code {
    code[index] = codeChars[seededRand.Intn(len(codeChars))]
  }
  return string(code)
}

func (db *MongoDb) CreateToken(userId *primitive.ObjectID) (userModel.Auth, error) {
  collection := db.GetCollection(authCollection)

  token := GenerateRandomCode(6)
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
