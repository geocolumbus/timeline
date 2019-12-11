# timeline

## Download and install

```
git clone https://github.com/geocolumbus/timeline.git
npm install
```

### Install data

* Install couch database at 127.0.0.1:5984 and create a database called timeline.
* Enable CORS gtom Fauxton

CouchDB is a MacOS app available from the Launchpad. When you run it, a Project Fauxton window will open up and you can delete the database.

```http://127.0.0.1:5984/_utils```

Import the data

```bash
npm run import
```

You will need to create a search index. If you are importing new data, then delete the index and datbase and start over.

```
POST
http://127.0.0.1:5984/timeline/_index
accept: application/json
```

```
{
   "index": {
      "fields": [
         "year",
         "month",
         "day"
      ]
   },
   "name": "year-month-day-index",
   "type": "json"
}
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Resources

* PCRE Regular Expressions Cheatsheet - https://www.debuggex.com/cheatsheet/regex/pcre
* Couch 2.3.1 API Reference - http://docs.couchdb.org/en/2.3.1/api/
