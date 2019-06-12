package server

import (
  "fmt"
  "log"
  "net/http"
  "os"

  "github.com/gorilla/mux"
  "github.com/gorilla/handlers"

  "github.com/jaconsta/webmarks/dao"
  "github.com/jaconsta/webmarks/handler"
)


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
  portString := os.Getenv("PORT")
  port := fmt.Sprintf(":%v", portString)

  log.Printf("Server listening on %s 🚀", portString)
  options := []handlers.CORSOption{
    handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
    handlers.AllowedMethods([]string{"HEAD", "OPTIONS", "GET", "POST", "PUT", "DELETE"}),
    handlers.AllowedOrigins([]string{"*"}),
  }

  if err := http.ListenAndServe(port, handlers.CORS(options...)(s.router)); err != nil {
    log.Fatal("http.ListenAndServe", err)
  }
}

func (s *Server) RegisterRoutes(){
  corsMiddleware := mux.CORSMethodMiddleware(s.router)
  s.router.HandleFunc("/", handler.GeneralResponse)
  handler.NewAuthRouter(s.mongodb, s.newSubRouter("/auth"))
  handler.NewSitesRouter(s.mongodb, s.newSubRouter("/api/sites"))
  handler.NewCategoriesRouter(s.mongodb, s.newSubRouter("/api/categories"))
  s.router.HandleFunc("/health", handler.HealthCheckHandler).Methods("GET", "OPTIONS")
  s.router.Use(corsMiddleware)
}

func (s *Server) newSubRouter(path string) *mux.Router {
  return s.router.PathPrefix(path).Subrouter()
}
