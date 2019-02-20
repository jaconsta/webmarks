package main

import (
  "encoding/json"
  "io/ioutil"
  "log"
  "net/http"
)

type Site struct {
  Name string `json:"name"`
  Url string `json:"url"`
  Rate int `json:"rate"`
  Start int `json:"start"`
}

type Sites struct {
  Sites []Site `json:"sites"`
}

type OkResponse struct {
  Message string `json:"message"`
}

var sites = Sites {
    Sites : []Site{
      Site{Name: "Google", Url: "https://www.google.com/", Rate: 3, Start: 4},
      Site{Name: "Facebook", Url: "https://www.facebook.com/", Rate: 3, Start: 2},
      Site{Name: "Jaconsta", Url: "https://www.jaconsta.com/", Rate: 5, Start: 5},
      Site{Name: "github", Url: "https://github.com/jaconsta", Rate: 4, Start: 3},
    },
}

func appendToSlices(site Site) {
  newSites := append(sites.Sites, site)
  sites = Sites {
    Sites: newSites,
  }
}

func getSites(w http.ResponseWriter, r *http.Request) {
  res, err := json.Marshal(sites)
  if err != nil {
    log.Printf("Could not parse sites response")
    http.Error(w, http.StatusText(500), http.StatusInternalServerError)
    return
  }
  w.Header().Set("Content-type", "application/json")
  w.Write(res)
}

func addPost(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "Bad body", http.StatusInternalServerError)
  }
  // Serialize
  var site *Site
  json.Unmarshal(body, &site)
  if err != nil {
    http.Error(w, "Could not parse body", http.StatusInternalServerError)
  }

  //update sites list
  appendToSlices(*site)

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

func SitesHttpHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
    case http.MethodGet:
      getSites(w, r)
      return
    case http.MethodPost:
      addPost(w, r)
      return

  }
}

func main() {
  http.HandleFunc("/", SitesHttpHandler)
  log.Printf("Server running on port 8080")
  log.Fatal(http.ListenAndServe(":8080", nil))
}
