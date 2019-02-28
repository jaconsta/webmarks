package models

import (
  "context"
  "log"

  "github.com/mongodb/mongo-go-driver/bson"
  "github.com/mongodb/mongo-go-driver/bson/primitive"
  "github.com/mongodb/mongo-go-driver/mongo/options"
)
var sitesCollection = "sites"

type Site struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  Name string `json:"name"`
  Url string `json:"url"`
  Rate int `json:"rate"`
  Stars int `json:"stars"`
}

// List Types
type Sites struct {
  Sites []*Site `json:"sites"`
}

func (db *MongoDb) GetAllSites () (Sites, error) {
  collection := db.GetCollection(sitesCollection)
  findOptions := options.Find()

  var siteList []*Site
  cursor, err := collection.Find(context.TODO(), findOptions)
  if err != nil {
    log.Printf("Error getting Sites ", err)
    return Sites{}, err
  }

  // Decode cursor
  for cursor.Next(context.TODO()) {
    var site Site
    err := cursor.Decode(&site)
    if err != nil {
      log.Printf("Error decoding Sites ", err)
      return Sites{}, err
    }
    siteList = append(siteList, &site)
  }

  // In case something happened with the query
  if err = cursor.Err(); err != nil {
    log.Fatal(err)
  }
  cursor.Close(context.TODO())

  sites := Sites{Sites: siteList}
  return sites, nil

}

func (db *MongoDb) AddSite (site *Site) (err error) {
  collection := db.GetCollection(sitesCollection)

  _, err = collection.InsertOne(context.TODO(), site)  // First argument is the document _id
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return err
  }
  return nil
}

func (db *MongoDb) FindOneSite (id string) (Site, error) {
  collection := db.GetCollection(sitesCollection)
  filter := bson.M{"_id": id}

  var site Site
  err := collection.FindOne(context.TODO(), filter).Decode(&site)
  if err != nil {
    log.Printf("Could not get Site")
    return Site{}, err
  }
  return site, nil
}
