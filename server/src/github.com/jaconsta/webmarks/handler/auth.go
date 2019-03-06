package handler

import (
  "log"
  "net/http"
  "os"

  jwt "github.com/dgrijalva/jwt-go"
  "github.com/gorilla/mux"
  "github.com/mongodb/mongo-go-driver/bson/primitive"

  "github.com/jaconsta/webmarks/dao"
)

type AuthRouter struct {
  mongoDb *dao.MongoDb
}

type userEmail struct {
  Email string `json:"email"`
}

type tokenChallenge struct {
  Token string `json:"code"`
  Email string `json:"email"`
}

func  NewAuthRouter (dbSess *dao.MongoDb, router *mux.Router) *mux.Router {
  authRouter := AuthRouter{mongoDb: dbSess}

  log.Printf("Adding categories routes.")

  router.HandleFunc("/register/", authRouter.registerUser).Methods("POST")
  router.HandleFunc("/login/", authRouter.requestEmailToken).Methods("POST")
  router.HandleFunc("/password_challenge/", authRouter.promptTokenValidation).Methods("POST")

  return router
}

func (authRouter *AuthRouter) registerUser(w http.ResponseWriter, r *http.Request) {
  var user *dao.User
  if err := readBody(r.Body, &user); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }

  _, err := authRouter.mongoDb.RegisterUser(user)
  if err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
  }

  response := map[string]interface{}{"message": "userCreated"}
  jsonResponse(w, r, response)
}

func (authRouter *AuthRouter) requestEmailToken(w http.ResponseWriter, r *http.Request) {
  var email *userEmail
  if err := readBody(r.Body, &email); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }

  // get user
  user, err := authRouter.mongoDb.FindUserByEmail(email.Email)
  if err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
  }
  if _, err := authRouter.mongoDb.CreateToken(user.ID); err != nil {
    http.Error(w, "Could not authenticate", http.StatusInternalServerError)
  }

  // Response
  response := map[string]interface{}{"message": "tokenCreated"}
  jsonResponse(w, r, response)
}

func (authRouter *AuthRouter) promptTokenValidation(w http.ResponseWriter, r *http.Request) {
    var credentials *tokenChallenge
    if err := readBody(r.Body, &credentials); err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
    }

    // get user
    user, err := authRouter.mongoDb.FindUserByEmail(credentials.Email)
    if err != nil {
      http.Error(w, err.Error(), http.StatusBadRequest)
      return
    }
    _, err = authRouter.mongoDb.FindAuthByUserAndToken(user.ID, credentials.Token)
    if err != nil {
      http.Error(w, "Could not authenticate", http.StatusInternalServerError)
      return
    }

    jwtToken := authRouter.generateUserJwtToken(&user)

    // Response
    response := map[string]interface{}{"token": jwtToken}
    jsonResponse(w, r, response)
}

type JwtToken struct {
  UserID *primitive.ObjectID `json:"userId"`
  Email string `json:"email"`
  jwt.StandardClaims
}
func (authRouter *AuthRouter) generateUserJwtToken (user *dao.User) string {
  tokenBody := &JwtToken{UserID: user.ID, Email: user.Email}
  token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tokenBody)
  signPassword := []byte(os.Getenv("JWT_SIGN_PASSWORD"))
  signedToken, _ := token.SignedString(signPassword)

  return signedToken
}
