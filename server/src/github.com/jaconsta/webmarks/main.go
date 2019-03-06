package main

import (
  "log"

  "github.com/joho/godotenv"

  "github.com/jaconsta/webmarks/dao"
  "github.com/jaconsta/webmarks/server"
)

func init () {
  err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }
}

func main() {
  dbSession, err := dao.Connect()
  if err != nil {
    log.Fatal("Could not connect to database")
  }
  defer dbSession.Close()
  srvr := server.NewServer(dbSession)
  srvr.Start()
}
