package main

import (
  "gopkg.in/mgo.v2/bson"
)

type Site struct {
  Id bson.ObjectId `bson:"_id" json:"id"`
  Name string `json:"name"`
  Url string `json:"url"`
  Rate int `json:"rate"`
  Stars int `json:"stars"`
}

// List Types
type Sites struct {
  Sites []Site `json:"sites"`
}


// Response Types
type OkResponse struct {
  Message string `json:"message"`
}
