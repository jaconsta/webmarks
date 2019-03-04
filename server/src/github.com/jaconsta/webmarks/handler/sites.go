package handler

import (
  "encoding/json"
  "io/ioutil"
  "log"
  "net/http"

  "github.com/gorilla/mux"

  "github.com/jaconsta/webmarks/dao"
  "github.com/jaconsta/webmarks/middleware"
)

type SitesRouter struct {
  mongoDb *dao.MongoDb
}

func  NewSitesRouter (dbSess *dao.MongoDb, router *mux.Router) *mux.Router {
  sitesRouter := SitesRouter{mongoDb: dbSess}

  log.Printf("Adding sites routes.")

  router.HandleFunc("/", middleware.IsUserLoggedIn(sitesRouter.getSites)).Methods("GET")
  router.HandleFunc("/", middleware.IsUserLoggedIn(sitesRouter.addSite)).Methods("POST")

  return router
}

func (siteRouter *SitesRouter) getSites(w http.ResponseWriter, r *http.Request) {
  sites, _ := siteRouter.mongoDb.GetAllSites()
  jsonResponse(w, r, sites)
}

func (siteRouter *SitesRouter) addSite(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "Bad body", http.StatusInternalServerError)
  }
  // Serialize
  var site *dao.Site
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
  response := map[string]interface{}{"message": "Site added"}
  addedResponse, err := json.Marshal(response)
    if err != nil {
      log.Printf("Could not write response")
      http.Error(w, "Could not write response", http.StatusInternalServerError)
      return
    }
  w.Header().Set("Content-type", "application/json")
  w.Write(addedResponse)
}
