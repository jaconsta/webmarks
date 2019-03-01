package main

import (
  "log"
  "net/http"

  "github.com/gorilla/mux"
  "github.com/gorilla/handlers"

  "github.com/jaconsta/webmarks/dao"
)

func init () {
}

type Server struct {  // Env
  router *mux.Router
  mongodb *dao.MongoDb
}

func NewServer (db *dao.MongoDb) *Server {
  server := Server{router: mux.NewRouter(), mongodb: db}
  server.RegisterRoutes()
  return &server
}

func (s *Server) Start() {
  log.Printf("Server listening on port 8080 🚀")
  options := []handlers.CORSOption{
    handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
    handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "OPTIONS"}),
    handlers.AllowedOrigins([]string{"*"}),
  }
  if err := http.ListenAndServe(":8080", handlers.CORS(options...)(s.router)); err != nil {
    log.Fatal("http.ListenAndServe", err)
  }
}

func (s *Server) RegisterRoutes(){
  corsMiddleware := mux.CORSMethodMiddleware(s.router)
  s.router.HandleFunc("/", GeneralResponse)
  NewSitesRouter(s.mongodb, s.newSubRouter("/api/sites"))
  NewCategoriesRouter(s.mongodb, s.newSubRouter("/api/categories"))
  s.router.HandleFunc("/health", HealthCheckHandler).Methods("GET", "OPTIONS")
  s.router.Use(corsMiddleware)
}

func (s *Server) newSubRouter(path string) *mux.Router {
  return s.router.PathPrefix(path).Subrouter()
}

func main() {
  dbSession, err := dao.Connect()
  if err != nil {
    log.Fatal("Could not connect to database")
  }
  defer dbSession.Close()
  server := NewServer(dbSession)
  server.Start()
}
