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

    const mangoQuery = {
        selector: {},
        sort: ["year", "month", "day"]
    }

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

    const result = await couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
        console.log(JSON.stringify(data, null, 4))
        return data.docs ? data.docs : []
    }, err => {
        return err
    })

    return result
}

export default {
    generalSearch: _generalSearch
}
