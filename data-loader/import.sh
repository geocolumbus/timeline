#!/usr/bin/env bash

COUCH_URL="http://127.0.0.1:5984"
COUCH_DB="timeline"
COUCH_JSON_PATH=""
FILE="data-loader/master-timeline.json"

dbdata=`curl -X GET http://localhost:5984/timeline`

if [[ $dbdata =~ \"doc_count\":0 ]]; then
  cat $FILE | node_modules/.bin/couchimport --type json --url $COUCH_URL --database $COUCH_DB --jsonpath $COUCH_JSON_PATH
fi
