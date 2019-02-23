package main

type Site struct {
  Name string `json:"name"`
  Url string `json:"url"`
  Rate int `json:"rate"`
  Stars int `json:"stars"`
}

// List Types
type Sites struct {
  Sites []Site `json:"sites"`
}


// Response Types
type OkResponse struct {
  Message string `json:"message"`
}
