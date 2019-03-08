package handler

import (
  "encoding/json"
  "io/ioutil"
  "log"
  "net/http"

  "github.com/gorilla/mux"

  "github.com/jaconsta/webmarks/dao"
  "github.com/jaconsta/webmarks/middleware"

  categoryModel "github.com/jaconsta/webmarks/models/category"
)

type CategoriesRouter struct {
  // sitesService SitesService
  mongoDb *dao.MongoDb
}

type res struct {
  Id string `json:"id"`
}

func  NewCategoriesRouter (dbSess *dao.MongoDb, router *mux.Router) *mux.Router {
  sitesRouter := CategoriesRouter{mongoDb: dbSess}

  log.Printf("Adding categories routes.")

  router.HandleFunc("/", middleware.IsUserLoggedIn(sitesRouter.getCategories)).Methods("GET")
  router.HandleFunc("/", middleware.IsUserLoggedIn(sitesRouter.addCategory)).Methods("POST")

  return router
}

func (categoryRouter *CategoriesRouter) getCategories(w http.ResponseWriter, r *http.Request) {
  categoryList, _ := categoryRouter.mongoDb.GetAllCategories()
  categories := categoryModel.Categories{Categories: categoryList}
  jsonResponse(w, r, categories)
}

func (categoryRouter *CategoriesRouter) addCategory(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "Bad body", http.StatusInternalServerError)
  }
  // Serialize
  var category *categoryModel.Category
  json.Unmarshal(body, &category)
  if err != nil {
    http.Error(w, "Could not parse body", http.StatusInternalServerError)
  }

  //update sites list
  id, err := categoryRouter.mongoDb.AddCategory(category)
  if err != nil {
    http.Error(w, "Could not add site", http.StatusBadRequest)
  }

  // Response
  response := res{id}
  jsonResponse(w, r, response)
}
