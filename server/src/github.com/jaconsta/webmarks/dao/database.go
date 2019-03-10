package dao

import (
  "context"
  "log"
  "os"

  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDb struct {
  Client *mongo.Client
}

func Connect() (*MongoDb,  error) {
  MongoUrl := os.Getenv("MONGO_URL")

  client, err := mongo.NewClient(options.Client().ApplyURI(MongoUrl))
  if err != nil {
      return nil, err
  }
  err = client.Connect(context.TODO())
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
