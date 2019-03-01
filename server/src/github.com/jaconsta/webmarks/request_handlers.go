package main

import (
  "encoding/json"
  "io/ioutil"
  "log"
  "net/http"

  "github.com/gorilla/mux"

  "github.com/jaconsta/webmarks/dao"
)

type SitesRouter struct {
  // sitesService SitesService
  mongoDb *dao.MongoDb
}

type res struct {
  Id string `json:"id"`
}

func  NewSitesRouter (dbSess *dao.MongoDb, router *mux.Router) *mux.Router {
  sitesRouter := SitesRouter{mongoDb: dbSess}

  log.Printf("Adding sites routes.")

  router.HandleFunc("/", sitesRouter.getSites).Methods("GET")
  router.HandleFunc("/", sitesRouter.addPost).Methods("POST")

  // router.HandleFunc("/", sitesRouter.getCategories).Methods("GET")
  // router.HandleFunc("/", sitesRouter.addCategory).Methods("POST")

  return router
}

func  NewCategoriesRouter (dbSess *dao.MongoDb, router *mux.Router) *mux.Router {
  sitesRouter := SitesRouter{mongoDb: dbSess}

  log.Printf("Adding categories routes.")

  router.HandleFunc("/", sitesRouter.getCategories).Methods("GET")
  router.HandleFunc("/", sitesRouter.addCategory).Methods("POST")

  return router
}


// CORS
func setupResponse(w *http.ResponseWriter, req *http.Request) {
  (*w).Header().Set("Access-Control-Allow-Origin", "*")
  (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS") //, PUT, DELETE")
  (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func MessageResponse(w *http.ResponseWriter, req *http.Request, message string) {
  response := map[string]interface{}{"message": message}//OkResponse{message}
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
  siteRouter.jsonResponse(w, r, sites)
}

func (siteRouter *SitesRouter) addPost(w http.ResponseWriter, r *http.Request) {
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

func (siteRouter *SitesRouter) getCategories(w http.ResponseWriter, r *http.Request) {
  categoryList, _ := siteRouter.mongoDb.GetAllCategories()
  categories := dao.Categories{Categories: categoryList}
  siteRouter.jsonResponse(w, r, categories)
}

func (siteRouter *SitesRouter) addCategory(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "Bad body", http.StatusInternalServerError)
  }
  // Serialize
  var category *dao.Category
  json.Unmarshal(body, &category)
  if err != nil {
    http.Error(w, "Could not parse body", http.StatusInternalServerError)
  }

  //update sites list
  id, err := siteRouter.mongoDb.AddCategory(category)
  if err != nil {
    http.Error(w, "Could not add site", http.StatusBadRequest)
  }

  // Response
  response := res{id}
  siteRouter.jsonResponse(w, r, response)
}


func (siteRouter *SitesRouter) jsonResponse(w http.ResponseWriter, r *http.Request, v interface{}) {
  res, err := json.Marshal(v)
  if err != nil {
    log.Printf("Could not parse the response.")
    http.Error(w, "Could not parse the response.", http.StatusInternalServerError)
    return
  }
  w.Header().Set("Content-type", "application/json")
  w.Write(res)
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
