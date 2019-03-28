<template>
    <div class="event">
        <v-layout row flat>
            <v-flex xs12 class="item-container">
                <div class="icon-column">
                    <v-btn fab small color="primary" v-ripple @click="loadItems">
                        <v-icon>unfold_more</v-icon>
                    </v-btn>
                </div>
                <div class="date-column">
                    {{formatYear(item.year)}}{{formatMonth(item)}}{{formatDay(item)}}
                </div>
                <div class="event-column">{{item.event}}</div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

    import numeral from "numeral"
    import timeline from "../services/timeline"

    export default {
        props: {
            item: Object
        },
        methods: {
            formatMonth: function (item) {
                const filler = item.year > -10000 ? "-xx" : ""
                return item.month ? "-" + numeral(item.month).format("00") : filler
            },
            formatDay: function (item) {
                const filler = item.year > -10000 ? "-xx" : ""
                return item.day ? "-" + numeral(item.day).format("00") : filler
            },
            formatYear: function (item) {
                return item ? Math.abs(item) > 9999 ? numeral(item).format("0,0") : numeral(item).format("0") : "xxxx"
            },
            loadItems: async function () {
                const monthItems = await timeline.getMonth({
                    item: this.item
                })
                monthItems.docs.forEach(doc => {
                    console.log(`${doc.year}-${doc.month ? doc.month : "xx"}-${doc.day ? doc.day : "xx"} ${doc.event.substring(0, 64)}`)
                })
            }
        }
    }
</script>

<style>

    .icon-column {
        width: 48px;
        float: left;
        border-top: thin solid grey;
        text-align: center;
    }

    .date-column {
        width: 130px;
        float: left;
        border-top: thin solid grey;
        text-align: center;
        font-family: "Andale Mono", monospace;
        font-weight: bold;
        padding: 14px 0 4px 0;
    }

    .event-column {
        width: calc(100% - 130px - 48px);
        float: left;
        padding: 14px 4px 4px 8px;
        border-top: thin solid grey;
        border-left: thin solid grey;
        min-height: 53px;
    }

    .item-container {
        border-left: thin solid grey;
        border-right: thin solid grey;
    }
</style>
