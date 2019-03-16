<template>
    <v-layout column fill-height pl-5 pr-5>

        <v-flex shrink class="controls" pt-3 pl-3 pr-3 mb-3>
            <v-layout row>
                <v-flex xs4>Search
                    <v-text-field v-model="keywords"></v-text-field>
                </v-flex>
                <v-flex xs8></v-flex>
            </v-layout>
        </v-flex>

        <v-flex id="scroller" class="results">
            <v-layout column fill-height v-scroll:#scroller="handleScroll">
                <v-flex shrink v-for="item in items" :key="item._id">
                    <v-layout row flat>
                        <v-flex xs12 class="item-container">
                            <div class="date-column">
                                {{formatYear(item.year)}}{{formatMonth(item)}}{{formatDay(item)}}
                            </div>
                            <div class="event-column">{{item.event}}</div>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>

    </v-layout>
</template>

<script>
    import timeline from "../services/timeline"
    import numeral from "numeral"

    export default {
        data: function () {
            return {
                bookmark: null,
                items: [],
                keywords: "",
                timer: null
            }
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
            handleScroll: function (e) {
                console.log(e)
            }
        },
        watch: {
            keywords: function () {
                window.clearTimeout(this.timer)
                if (this.keywords === "") {
                    this.items = []
                    return
                }
                this.timer = setTimeout(async () => {

                    const data = await timeline.generalSearch({
                        search: this.keywords
                    })

                    this.items = data.docs
                    this.bookmark = data.bookmark
                }, 750)
            }
        }
    }
</script>

<style>
    .controls {
        background-color: lightgrey
    }

    .results {
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .date-column {
        width: 120px;
        float: left;
        border-top: thin solid grey;
        text-align: center;
        font-family: "Andale Mono";
        font-weight: bold;
        padding-top: 4px;
    }

    .event-column {
        width: calc(100% - 120px);
        float: left;
        padding: 4px;
        border-top: thin solid grey;
        border-left: thin solid grey;
    }

    .item-container {
        border-left: thin solid grey;
        border-right: thin solid grey;
    }
</style>
