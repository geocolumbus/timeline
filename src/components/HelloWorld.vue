<template>
    <v-layout column fill-height pl-5 pr-5>

        <v-flex shrink class="controls" pt-3 pl-3 pr-3 mb-3>
            <v-layout row>
                <v-flex xs4>Search
                    <v-text-field v-model="keywords"></v-text-field>
                </v-flex>
                <v-flex xs1></v-flex>
                <v-flex xs7>
                    <v-layout row>
                        <v-flex xs2>Start Year
                            <v-text-field v-model="startYear"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs2>End Year
                            <v-text-field v-model="endYear"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex class="results">
            <v-layout column fill-height>
                <v-flex shrink v-for="item in items" :key="item._id">
                    <v-divider></v-divider>
                    <v-layout row flat pt-1 pb-1>
                        <v-flex text-xs-center xs2>
                            {{formatYear(item.year)}}{{formatMonth(item.month)}}{{formatDay(item.day)}}
                        </v-flex>
                        <v-flex xs10>{{item.event}}</v-flex>
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
                endYear: "",
                items: [],
                keywords: "",
                startYear: "",
                timer: null
            }
        },
        methods: {
            formatMonth: function (item) {
                return item ? "-" + numeral(item).format("00") : "-xx"
            },
            formatDay: function (item) {
                return item ? "-" + numeral(item).format("00") : "-xx"
            },
            formatYear: function (item) {
                return item ? Math.abs(item) > 9999 ? numeral(item).format("0,0") : numeral(item).format("0") : "xxxx"
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
</style>
