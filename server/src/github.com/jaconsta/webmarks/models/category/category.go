package category

import (
  "go.mongodb.org/mongo-driver/bson/primitive"
)

type Category struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  Name string `json:"name"`
  UserID *primitive.ObjectID `json:"-"` // private
}

type Categories struct {
  Categories []*Category `json:"categories"`
}
