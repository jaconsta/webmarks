package site

import (
  "github.com/mongodb/mongo-go-driver/bson/primitive"
)

type Site struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  Name string `json:"name"`
  Url string `json:"url"`
  Rate int `json:"rate"`
  Stars int `json:"stars"`
  Category *primitive.ObjectID `json:"category"`
}

type Sites struct {
  Sites []*Site `json:"sites"`
}
