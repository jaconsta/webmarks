package main

import (
  "log"
  "net/http"
)

func main() {
  http.HandleFunc("/", GeneralResponse)
  http.HandleFunc("/health", HealthCheckHandler)
  http.HandleFunc("/api/sites", SitesHttpHandler)
  log.Printf("Server running on port 8080")
  log.Fatal(http.ListenAndServe(":8080", nil))
}
