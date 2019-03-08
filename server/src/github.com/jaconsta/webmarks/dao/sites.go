package dao

import (
  "context"
  "log"

  "github.com/mongodb/mongo-go-driver/bson"
  "github.com/mongodb/mongo-go-driver/mongo/options"
  "github.com/mongodb/mongo-go-driver/bson/primitive"

  siteModel "github.com/jaconsta/webmarks/models/site"
  "github.com/jaconsta/webmarks/models/collections"
)

func (db *MongoDb) GetAllSites () (siteModel.Sites, error) {
  collection := db.GetCollection(collections.SitesCollection)
  findOptions := options.Find()

  var siteList []*siteModel.Site
  cursor, err := collection.Find(context.TODO(), findOptions)
  if err != nil {
    log.Printf("Error getting Sites ", err)
    return siteModel.Sites{}, err
  }

  // Decode cursor
  for cursor.Next(context.TODO()) {
    var site siteModel.Site
    err := cursor.Decode(&site)
    if err != nil {
      log.Printf("Error decoding Sites ", err)
      return siteModel.Sites{}, err
    }
    siteList = append(siteList, &site)
  }

  // In case something happened with the query
  if err = cursor.Err(); err != nil {
    log.Fatal(err)
  }
  cursor.Close(context.TODO())

  sites := siteModel.Sites{Sites: siteList}
  return sites, nil

}

func (db *MongoDb) AddSite (site *siteModel.Site) (err error) {
  collection := db.GetCollection(collections.SitesCollection)

  _, err = collection.InsertOne(context.TODO(), site)  // First argument is the document _id
  if err != nil {
    log.Printf("Could not insert document")
    log.Fatal(err)
    return err
  }
  return nil
}

func (db *MongoDb) FindOneSite (id string) (siteModel.Site, error) {
  collection := db.GetCollection(collections.SitesCollection)
  filter := bson.M{"_id": id}

  var site siteModel.Site
  err := collection.FindOne(context.TODO(), filter).Decode(&site)
  if err != nil {
    log.Printf("Could not get Site")
    return siteModel.Site{}, err
  }
  return site, nil
}

func (db *MongoDb) FindUserSites (userId *primitive.ObjectID) (siteModel.Sites, error) {
  collection := db.GetCollection(collections.SitesCollection)
  filter := bson.M{"userid": userId}

  var siteList []*siteModel.Site
  cursor, err := collection.Find(context.TODO(), filter)
  if err != nil {
    log.Printf("Could not get Site")
    return siteModel.Sites{}, err
  }

  // Decode cursor
  for cursor.Next(context.TODO()) {
    var site siteModel.Site
    err := cursor.Decode(&site)
    if err != nil {
      log.Printf("Error decoding Sites ", err)
      return siteModel.Sites{}, err
    }
    siteList = append(siteList, &site)
  }

  // In case something happened with the query
  if err = cursor.Err(); err != nil {
    log.Fatal(err)
  }
  cursor.Close(context.TODO())

  sites := siteModel.Sites{Sites: siteList}
  return sites, nil
}
