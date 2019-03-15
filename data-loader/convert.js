"use strict"

const csvFilePath = "data-loader/master-timeline.csv"
const csv = require("csvtojson")
const fs = require("fs")

const getJson = async function () {
    const json = await csv().fromFile(csvFilePath)
    return json
}

getJson().then(json => {
    for (let i = 0; i < json.length; i++) {
        json[i].year = parseInt(json[i].year.replace(/[^0-9-]/g, ""), 10)
        json[i].month = parseInt(json[i].month.replace(/[^0-9]/g, ""), 10)
        json[i].day = parseInt(json[i].day.replace(/[^0-9]/g, ""), 10)
    }

    fs.writeFileSync(`data-loader/master-timeline.json`,JSON.stringify(json,null,4))
})
