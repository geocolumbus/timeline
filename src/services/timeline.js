const NodeCouchDb = require("node-couchdb")

const couch = new NodeCouchDb({
    host: "127.0.0.1",
    protocol: "http",
    port: 5984
})

const dbName = "timeline"

const _generalSearch = async function (queryParams) {
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

    const mangoQuery = {selector: {}}

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

    // console.log(JSON.stringify(mangoQuery, null, 4))

    const parameters = {}

    const result = await couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
        return data.docs ? data.docs : []
    }, err => {
        return err
    })

    return result
}
/*
_generalSearch({
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
    */

export default {
    generalSearch: _generalSearch
}
