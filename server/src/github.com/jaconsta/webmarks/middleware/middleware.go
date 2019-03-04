package middleware

import (
  "log"
  "net/http"
  "encoding/json"
)

func IsUserLoggedIn(handler http.HandlerFunc) http.HandlerFunc {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    token := r.Header.Get("Authorization")
    if token == "" {
      message := map[string]interface{}{"error": "Missing access token"}
      res, _ := json.Marshal(message)
      w.WriteHeader(http.StatusUnauthorized)
      w.Header().Set("Content-type", "application/json")
      w.Write(res)
      // http.Error(w, res, http.StatusUnauthorized)
      return
    }
    log.Printf("Authorization: %s ", token)
    handler.ServeHTTP(w,r)
  })
}
