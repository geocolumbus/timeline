const NodeCouchDb = require("node-couchdb")
const indexId = "_design/818e79efd94a790ac6263d5348256b951eaa4798"

const couch = new NodeCouchDb({
    host: "127.0.0.1",
    protocol: "http",
    port: 5984
})

const dbName = "timeline"

const _generalSearch = async function (queryParams) {
    const searchString = queryParams.search
    const bookmark = queryParams.bookmark

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
        use_index: indexId,
        limit: 100
    }

    if (eventRegex) {
        mangoQuery.selector.event = {"$regex": eventRegex}
    }
    if (bookmark) {
        mangoQuery.bookmark = bookmark
    }

    const parameters = {}

    const result = await couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
        return status === 200 && data.docs ? data : {data: []}
    }, err => {
        return err
    })

    return result
}

/**
 * Return all the events for a given month
 * @param queryParams
 * @returns {Promise<{data: Array}|any[]|*>}
 * @private
 */
const _getMonth = async function (queryParams) {

    const mangoQuery = {
        selector: {
            year: {"$eq": queryParams.item.year},
            month: {"$eq": queryParams.item.month},
            day: {"$gt": 0}
        },
        use_index: indexId,
        limit: 1000
    }

    const result = await couch.mango(dbName, mangoQuery, {}).then(({data, headers, status}) => {
        return status === 200 && data.docs ? data : {data: []}
    }, err => {
        return err
    })

    return result
}

/**
 * Return all the events for a given year
 * @param queryParams
 * @returns {Promise<void>}
 * @private
 */
const _getYear = async function (queryParams) {

    const mangoQuery = {
        selector: {
            year: {"$eq": queryParams.item.year}
        },
        use_index: indexId,
        limit: 1000
    }

    const result = await couch.mango(dbName, mangoQuery, {}).then(({data, headers, status}) => {
        return status === 200 && data.docs ? data : {data: []}
    }, err => {
        return err
    })

    return result
}

export default {
    generalSearch: _generalSearch,
    getMonth: _getMonth,
    getYear: _getYear
}
