const NodeCouchDb = require("node-couchdb")

const couch = new NodeCouchDb({
    host: "localhost",
    protocol: "http",
    port: 5984
})

const dbName = "timeline"

const generalSearch = function (queryParams) {
    const year = queryParams.year
    const month = queryParams.month
    const day = queryParams.day
    const searchString = queryParams.search

    let eventRegex
    if (searchString) {
        eventRegex = "(?i)"
        const keywords = searchString.split(" ")
        for (let i = 0; i < keywords.length; i++) {
            eventRegex += `(?=.*\\b${keywords[i]}\\b)`
        }
    }

    const mangoQuery = {selector:{}}

    if (eventRegex) {
        mangoQuery.selector.event = {"$regex": eventRegex}
    }
    if (year) {
        mangoQuery.selector.year = year
    }
    if (month) {
        mangoQuery.selector.month = month
    }
    if (day) {
        mangoQuery.selector.day = day
    }

    console.log(JSON.stringify(mangoQuery, null, 4))

    const parameters = {}

    return new Promise((resolve, reject) => {
        couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
            resolve(data.docs ? data.docs : [])
        }, err => {
            reject(err)
        })
    })
}

generalSearch({
    year: "1776",
    search: "george"

})
    .then(results => {
        console.log(`Number of records returned: ${results.length}`)
        for (let i = 0; i < results.length; i++) {
            console.log(`${results[i].month}-${results[i].day}-${results[i].year}\t${results[i].event}\n`)
        }
    })
    .catch(err => {
        console.log(err)
    })
