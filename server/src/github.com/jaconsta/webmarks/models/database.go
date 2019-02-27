package models

import (
  "log"
  mgo "gopkg.in/mgo.v2"
)

type MongoDb struct {
  // Session *mgo.Session
  Database *mgo.Database //string
}

var MongoUrl = "mongodb://localhost:27017"

func Connect(url string) (MongoDb,  error) {
  session, err := mgo.Dial(MongoUrl)
  if err != nil {
    log.Printf("Error connecting to %s", MongoUrl)
    return MongoDb{}, err
  }
  // mongo = MongoDb{session.DB("webmarks")}
  return MongoDb{session.DB("webmarks")}, err //Session, "webmarks"}, err
}

func (db *MongoDb) GetCollection(collection string) *mgo.Collection {
  // return db.Session.DB(db.Database).C(collection)
  return db.Database.C(collection)
}

func (db *MongoDb) Close () {
  // if db.Session == nil {
  //  return
  // }
  // db.Session.Close()
}
