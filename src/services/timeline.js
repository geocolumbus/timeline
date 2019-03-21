const NodeCouchDb = require("node-couchdb")

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
        use_index: "_design/818e79efd94a790ac6263d5348256b951eaa4798",
        limit: 200
    }

    if (eventRegex) {
        mangoQuery.selector.event = {"$regex": eventRegex}
    }
    if (bookmark) {
        mangoQuery.bookmark = bookmark
    }

    // console.log(JSON.stringify(mangoQuery, null, 4))

    const parameters = {}

    const result = await couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
        // console.log(data.docs.length)
        return status === 200 && data.docs ? data : {data: []}
    }, err => {
        return err
    })

    return result
}

/**
 * Find X number of items chronologically after a specific item
 * @param queryParams
 * @returns {Promise<void>}
 * @private
 */
const _getNext = async function (queryParams) {

    const mangoQuery = {
        selector: {
            _id: queryParams.id
        },
        use_index: "_design/818e79efd94a790ac6263d5348256b951eaa4798",
        limit: queryParams.count
    }

    // console.log(JSON.stringify(mangoQuery, null, 4))

    const parameters = {}

    const result = await couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
        // console.log(data.docs.length)
        return status === 200 && data.docs ? data : {data: []}
    }, err => {
        return err
    })

    return result

}

/**
 * Find x number of items chronologically before a specific item
 * @param queryParams
 * @returns {Promise<void>}
 * @private
 */
const _getPrev = async function (queryParams) {

    const mangoQuery = {
        selector: {
            _id: queryParams.id
        },
        use_index: "_design/745a5d54dec1b3e8eef2ef0940659f621151a57",
        limit: queryParams.count
    }

    // console.log(JSON.stringify(mangoQuery, null, 4))

    const parameters = {}

    const result = await couch.mango(dbName, mangoQuery, parameters).then(({data, headers, status}) => {
        // console.log(data.docs.length)
        return status === 200 && data.docs ? data : {data: []}
    }, err => {
        return err
    })

    return result
}

export default {
    generalSearch: _generalSearch,
    getNext: _getNext,
    getPrev: _getPrev
}
