package user

import (
  "go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  Email string `json:"email"`
  FirstName string `json:"firstName"`
  LastName string `json:"lastName"`
}
