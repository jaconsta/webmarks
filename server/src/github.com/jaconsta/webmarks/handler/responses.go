package handler

import (
  "io"
  "io/ioutil"
  "encoding/json"
  "errors"
  "log"
  "net/http"
)

// CORS
func setupResponse(w *http.ResponseWriter, req *http.Request) {
  (*w).Header().Set("Access-Control-Allow-Origin", "*")
  (*w).Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
  (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func MessageResponse(w http.ResponseWriter, r *http.Request, message string) {  // *http.ResponseWriter, r *http.Request, message string) {
  response := map[string]interface{}{"message": message}
  jsonResponse(w, r, response) //  &w, r, response)
  // (*w).Header().Set("Content-type", "application/json")
  // (*w).Write(addedResponse)
}

func readBody(data io.Reader, v interface{}) error {
  body, err := ioutil.ReadAll(data)
  if err != nil {
    errors.New("Bad body")
  }
  // Serialize
  json.Unmarshal(body, &v)
  if err != nil {
    errors.New("Could not parse body")
  }
  return nil
}



func errorResponse(w http.ResponseWriter, v interface{}, code int) {
  res, err := json.Marshal(v)
  if err != nil {
    log.Printf("Could not parse the response.")
    return
  }
  w.WriteHeader(code)
  w.Header().Set("Content-type", "application/json")
  w.Write(res)
}

func jsonResponse(w http.ResponseWriter, r *http.Request, v interface{}) {
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
  MessageResponse(w, r, "Welcome")//  Need to adjust to &w, r, "Welcome")
}

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
  setupResponse(&w, r)
  if r.Method == http.MethodOptions {
    return
  }
  MessageResponse(w, r, "OK")//  Need to adjust to&w, r, "OK")
}
