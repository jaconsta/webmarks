package main

import (
  "log"
  "net/http"

  "github.com/gorilla/mux"

  "github.com/jaconsta/webmarks/models"
)

// type Env struct {
//   db models.DB
// }

// https://hackernoon.com/make-yourself-a-go-web-server-with-mongodb-go-on-go-on-go-on-48f394f24e
// https://github.com/mlabouardy/movies-restapi/blob/master/app.go#L86-L95

// var db = database.MongoDb{}
var mongoUrl = "mongodb://localhost:27017"
func init () {
  // log.Printf("Running setup")
  // db, err := database.Connect("")
  // if err == nil {
  //   log.Fatal("Could not connect to database.")
  // }
  // log.Printf("Setup finished")
}

type Server struct {  // Env
  router *mux.Router
  mongodb models.MongoDb
}

func NewServer (db models.MongoDb) *Server {
  server := Server{router: mux.NewRouter(), mongodb: db}
  server.RegisterRoutes()
  return &server
}

func (s *Server) Start() {
  log.Printf("Server listening on port 8080")
  if err := http.ListenAndServe(":8080", s.router); err != nil {
    log.Fatal("http.ListenAndServe", err)
  }
}

func (s *Server) RegisterRoutes(){
  s.router.HandleFunc("/", GeneralResponse)
  NewSitesRouter(s.mongodb, s.newSubRouter("/api/sites"))
  s.router.HandleFunc("/health", HealthCheckHandler)
}

func (s *Server) newSubRouter(path string) *mux.Router {
  return s.router.PathPrefix(path).Subrouter()
}

func main() {
  dbSession, err := models.Connect(mongoUrl)
  if err != nil {
    log.Fatal("Could not connect to database")
  }
  defer dbSession.Close()
  server := NewServer(dbSession)
  server.Start()
}
