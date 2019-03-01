package handler

import (
  "encoding/json"
  "log"
  "net/http"
)

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
  MessageResponse(&w, r, "Welcome")
}

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
  setupResponse(&w, r)
  if r.Method == http.MethodOptions {
    return
  }
  MessageResponse(&w, r, "OK")
}
