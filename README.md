# Webmarks

Your chosen shortcuts to the web.

### Frontend scripts

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test`

Launches the tests.

`npm run build`

Builds the app for production to the `build` folder.

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

### Backend scripts

```
ProjectFolder=$(pwd) export GOPATH=$ProjectFolder/server/
cd "${GOPATH}src/github.com/jaconsta/webmarks"
go build
./webmarks
```

Sets the go path, compiles and runs the server.
