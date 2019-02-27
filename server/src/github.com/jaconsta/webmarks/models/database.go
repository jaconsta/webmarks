package models

import (
  "context"
  "log"

  "github.com/mongodb/mongo-go-driver/mongo"
)

type MongoDb struct {
  Client *mongo.Client
}

var MongoUrl = "mongodb://localhost:27017"
var MongoDatabase = "webmarks"

func Connect() (*MongoDb,  error) {
  client, err := mongo.Connect(context.TODO(), MongoUrl)

  if err != nil {
    log.Printf("Error connecting to %s", MongoUrl)
    log.Fatal(err)
    return nil, err
  }
  // Check the connection
  err = client.Ping(context.TODO(), nil)

  if err != nil {
    log.Printf("Could not verify connection to %s", MongoUrl)
    log.Fatal(err)
  }

  log.Printf("Connected to mongo at %s", MongoUrl)
  mongodb := MongoDb{client}
  return &mongodb, err
}

func (db *MongoDb) GetCollection(collection string) *mongo.Collection {
  return db.Client.Database(MongoDatabase).Collection(collection)
}

func (db *MongoDb) Close () {
  if db.Client == nil {
    return
  }
  err := db.Client.Disconnect(context.TODO())
  if err != nil {
      log.Fatal(err)
  }
  log.Printf("Disconnected from database.")
}
