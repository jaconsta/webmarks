package middleware

import (
  "context"
  "encoding/json"
  "net/http"
  "strings"
  "log"
  "os"

  jwt "github.com/dgrijalva/jwt-go"

  "github.com/jaconsta/webmarks/dao"
  "github.com/jaconsta/webmarks/middleware/keys"
)

func IsUserLoggedIn(handler http.HandlerFunc) http.HandlerFunc {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    bearerToken := r.Header.Get("Authorization")
    if bearerToken == "" {
      message := map[string]interface{}{"error": "Missing access token"}
      res, _ := json.Marshal(message)
      w.WriteHeader(http.StatusUnauthorized)
      w.Header().Set("Content-type", "application/json")
      w.Write(res)
      return
    }

    // Take the Bearer part
    tokenSplitted := strings.Split(bearerToken, " ")
    if len(tokenSplitted) != 2 {
      message := map[string]interface{}{"error": "Incorrect access token"}
      res, _ := json.Marshal(message)
      w.WriteHeader(http.StatusForbidden)
      w.Header().Set("Content-type", "application/json")
      w.Write(res)
      return
    }
    stringToken := tokenSplitted[1]
    tokenClaims := &dao.JwtToken{}
    signPassword := []byte(os.Getenv("JWT_SIGN_PASSWORD"))
    jwtToken, err := jwt.ParseWithClaims(stringToken, tokenClaims, func(token *jwt.Token)(interface{}, error){
      return signPassword, nil
    })
    if err != nil {
      message := map[string]interface{}{"error": "Malformed access token"}
      res, _ := json.Marshal(message)
      w.WriteHeader(http.StatusForbidden)
      w.Header().Add("Content-type", "application/json")
      w.Write(res)
      return
    }
    if !jwtToken.Valid {
      message := map[string]interface{}{"error": "Invalid access token"}
      res, _ := json.Marshal(message)
      w.WriteHeader(http.StatusForbidden)
      w.Header().Add("Content-type", "application/json")
      w.Write(res)
      return
    }

    log.Printf("userId %s", tokenClaims.UserID)
    ctx := context.WithValue(r.Context(), keys.UserId, tokenClaims.UserID)

    handler.ServeHTTP(w,r.WithContext(ctx))
  })
}
