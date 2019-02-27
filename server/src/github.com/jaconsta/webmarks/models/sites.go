package models

import (
  "log"
  "gopkg.in/mgo.v2/bson"
)
var sitesCollection = "sites"

type Site struct {
  Id bson.ObjectId `bson:"_id" json:"id"`
  Name string `json:"name"`
  Url string `json:"url"`
  Rate int `json:"rate"`
  Stars int `json:"stars"`
}

// List Types
type Sites struct {
  Sites []Site `json:"sites"`
}

// While connect a DB
// var sites = Sites {
//     Sites : []Site{
//       Site{Name: "Google", Url: "https://www.google.com/", Rate: 3, Stars: 4},
//       Site{Name: "Facebook", Url: "https://www.facebook.com/", Rate: 3, Stars: 2},
//       Site{Name: "Jaconsta", Url: "https://www.jaconsta.com/", Rate: 5, Stars: 5},
//       Site{Name: "github", Url: "https://github.com/jaconsta", Rate: 4, Stars: 3},
//     },
// }

// func appendToSlices(site *Site) {
//   site.Id = bson.NewObjectId()
//   newSites := append(sites.Sites, (*site))
//   sites = Sites {
//     Sites: newSites,
//   }
// }


func (db *MongoDb) GetAllSites () (Sites, error) {
  // session := db.Session.Copy()
  collection := db.GetCollection(sitesCollection)
  // defer session.Close()

  var siteList []Site
  err := collection.Find(bson.M{}).All(&siteList)
  if err != nil {
    log.Fatal("Error getting Sites", err)
  }

  sites := Sites{Sites: siteList}
  return sites, nil

}

func (db *MongoDb) AddSite (site *Site) (err error) {
  // session := db.Session.Copy()
  collection := db.GetCollection(sitesCollection)
  // defer session.Close()

  // appendToSlices(site)
  collection.Insert(site)
  return nil
}
