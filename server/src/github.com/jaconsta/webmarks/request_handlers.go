package main

import (
  "encoding/json"
  "io/ioutil"
  "log"
  "net/http"

  "github.com/gorilla/mux"

  "github.com/jaconsta/webmarks/models"
)

type SitesRouter struct {
  // sitesService SitesService
  mongoDb *models.MongoDb
}

func  NewSitesRouter (dbSess *models.MongoDb, router *mux.Router) *mux.Router {
  sitesRouter := SitesRouter{mongoDb: dbSess}

  log.Printf("Adding routes.")
  router.HandleFunc("/", sitesRouter.getSites).Methods("GET")
  router.HandleFunc("/", sitesRouter.addPost).Methods("POST")

  return router
}

// CORS
func setupResponse(w *http.ResponseWriter, req *http.Request) {
  (*w).Header().Set("Access-Control-Allow-Origin", "*")
  (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS") //, PUT, DELETE")
  (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func MessageResponse(w *http.ResponseWriter, req *http.Request, message string) {
  response := OkResponse{message}
  addedResponse, err := json.Marshal(response)
    if err != nil {
      log.Printf("Could not write response")
      http.Error(*w, "Could not write response", http.StatusInternalServerError)
      return
    }
  (*w).Header().Set("Content-type", "application/json")
  (*w).Write(addedResponse)

}

func (siteRouter *SitesRouter) getSites(w http.ResponseWriter, r *http.Request) {
  sites, _ := siteRouter.mongoDb.GetAllSites()
  res, err := json.Marshal(sites)
  if err != nil {
    log.Printf("Could not parse sites response")
    http.Error(w, http.StatusText(500), http.StatusInternalServerError)
    return
  }
  w.Header().Set("Content-type", "application/json")
  w.Write(res)
}

func (siteRouter *SitesRouter) addPost(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "Bad body", http.StatusInternalServerError)
  }
  // Serialize
  var site *models.Site
  json.Unmarshal(body, &site)
  if err != nil {
    http.Error(w, "Could not parse body", http.StatusInternalServerError)
  }

  //update sites list
  err = siteRouter.mongoDb.AddSite(site)
  if err != nil {
    http.Error(w, "Could not add site", http.StatusBadRequest)
  }

  // Response
  response := OkResponse{"Site added"}
  addedResponse, err := json.Marshal(response)
    if err != nil {
      log.Printf("Could not write response")
      http.Error(w, "Could not write response", http.StatusInternalServerError)
      return
    }
  w.Header().Set("Content-type", "application/json")
  w.Write(addedResponse)
}

func GeneralResponse(w http.ResponseWriter, r *http.Request) {
  setupResponse(&w, r)
  if r.Method == http.MethodOptions {
    return
  }
  MessageResponse(&w, r, "Welcome")
}

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
  setupResponse(&w, r)
  if r.Method == http.MethodOptions {
    return
  }
  MessageResponse(&w, r, "OK")
}
