## Run Docker

Run mongo
```
docker run --name mark-mongo -d -p 27017:27017 mongo:3.6
```

build image

```
docker build -t webmarks-api .
```

Run it

```
docker run --name  webmarks-api -d -p 8080:8080  -e PORT=8080 -e MONGO_URL="mongodb://host.docker.internal:27017" -e MONGO_DATABASE="webmarks" -e JWT_SIGN_PASSWORD="IAmNotSuperJwtSecret" webmarks-api
```
