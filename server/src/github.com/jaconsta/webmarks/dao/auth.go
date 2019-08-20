package dao

import (
  "context"
  "errors"
  "log"
  "fmt"
  "math/rand"
  "time"
  "crypto/md5"
  "encoding/hex"
  "os"

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

func generateHash (secret string) string {
  hasher := md5.New()
  hasher.Write([]byte(secret))
  return hex.EncodeToString(hasher.Sum(nil))
}

func (db *MongoDb) CreateToken(userId *primitive.ObjectID) (string, error) {
  collection := db.GetCollection(authCollection)

  token := GenerateRandomCode(6)
  if environment := os.Getenv("ENVIRONMENT"); environment == "development" {
    log.Printf("Development token %s", token)
  }
  secret_token := generateHash(token)
  expiresAt := time.Now().Add(time.Hour * 24 * 1).UTC()

  auth := userModel.Auth{UserId: userId, Token: secret_token, ExpiresAt: expiresAt}

  _, err := collection.InsertOne(context.TODO(), auth)
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return "", err
  }

  return token, nil
}

func (db *MongoDb) FindAuthByUserAndToken (userId *primitive.ObjectID, token string) (userModel.Auth, error) {
  collection := db.GetCollection(authCollection)
  secret_token := generateHash(token)
  filter := bson.M{"token": secret_token, "userid": userId}

  var auth userModel.Auth
  err := collection.FindOne(context.TODO(), filter).Decode(&auth)
  if err != nil {
    log.Printf("Could not get Auth")
    return userModel.Auth{}, err
  }
  return auth, nil
}

func (db *MongoDb) UserTokenExists (userId *primitive.ObjectID) (error) {
  collection := db.GetCollection(authCollection)
  now := time.Now()

  filter := bson.M{"userid": userId, "expiresat": bson.M{"$gte": now}}

  var auth userModel.Auth
  err := collection.FindOne(context.TODO(), filter).Decode(&auth)
  if err == nil {
    // There is a document in the result
    return errors.New("User has a valid Token.")
  }
  if fmt.Sprintf("%s", err) == "mongo: no documents in result" {
    // There are no valid tokens
    return nil
  }

  return err
}
