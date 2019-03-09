package dao

import (
  "context"
  "log"
  "os"

  "github.com/mongodb/mongo-go-driver/mongo"
)

type MongoDb struct {
  Client *mongo.Client
}

func Connect() (*MongoDb,  error) {
  MongoUrl := os.Getenv("MONGO_URL")

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
  MongoDatabase := os.Getenv("MONGO_DATABASE")
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
