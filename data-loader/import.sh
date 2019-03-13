#!/usr/bin/env bash

COUCH_URL="http://127.0.0.1:5984"
COUCH_DB="timeline"
COUCH_DELIMETER=","
FILE="data-loader/master-timeline.csv"

dbdata=`curl -X GET http://localhost:5984/timeline`

if [[ $dbdata =~ \"doc_count\":0 ]]; then
  cat $FILE | node_modules/.bin/couchimport --url $COUCH_URL --database $COUCH_DB --delimiter $COUCH_DELIMETER
fi
