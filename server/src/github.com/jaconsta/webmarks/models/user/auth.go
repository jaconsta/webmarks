package user

import (
  "time"

  jwt "github.com/dgrijalva/jwt-go"
  "go.mongodb.org/mongo-driver/bson/primitive"
)

type Auth struct {
  ID *primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
  UserId *primitive.ObjectID `json:"userId"`
  Token string `json:"token"`
  ExpiresAt time.Time `json:"-"`
}

type JwtToken struct {
  UserID *primitive.ObjectID `json:"userId"`
  Email string `json:"email"`
  jwt.StandardClaims
}
