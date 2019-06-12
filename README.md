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

Set GOPATH

```
ProjectFolder=$(pwd) export GOPATH=$ProjectFolder/server/
```

Install [dep](https://github.com/golang/dep) dependency manager.
If you use the `curl` method, add it to you `PATH`

```
export PATH=$GOPATH/bin:$PATH
```

Install dependencies

```
dep ensure
```

Build and run the project

```
cd "${GOPATH}src/github.com/jaconsta/webmarks"
go build
ENVIRONMENT=development ./webmarks
```

Sets the go path, compiles and runs the server.
