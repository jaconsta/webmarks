package main

import (
  "log"
  "net/http"

  "github.com/gorilla/mux"

  "github.com/jaconsta/webmarks/models"
)

func init () {
}

type Server struct {  // Env
  router *mux.Router
  mongodb *models.MongoDb
}

func NewServer (db *models.MongoDb) *Server {
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
  dbSession, err := models.Connect()
  if err != nil {
    log.Fatal("Could not connect to database")
  }
  defer dbSession.Close()
  server := NewServer(dbSession)
  server.Start()
}
