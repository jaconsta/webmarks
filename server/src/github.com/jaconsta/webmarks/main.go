package main

import (
  "log"
  
  "github.com/jaconsta/webmarks/dao"
  "github.com/jaconsta/webmarks/server"
)

func init () {
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
