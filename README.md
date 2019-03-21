# timeline

## Download and install

```
git clone https://github.com/geocolumbus/timeline.git
npm install
```

### Install data

* Install couch database at 127.0.0.1:5984 and create a database called timeline.
* Enable CORS

```
npm run import
```

You will need to create a search index

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
