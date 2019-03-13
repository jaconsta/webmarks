package site

import (
  "go.mongodb.org/mongo-driver/bson/primitive"
)

type Site struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  Name string `json:"name"`
  Url string `json:"url"`
  Rate int `json:"rate"`
  Stars int `json:"stars"`
  Category *primitive.ObjectID `json:"category"`
  UserID *primitive.ObjectID `json:"-"` // private
}

type Sites struct {
  Sites []*Site `json:"sites"`
}
