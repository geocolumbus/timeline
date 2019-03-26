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

        <v-flex id="scroller" class="results" v-scroll:#scroller="handleScroll">
            <v-layout column fill-height>
                <v-flex shrink v-for="item in items" :key="item._id">
                    <event :item="item"></event>
                </v-flex>
            </v-layout>
        </v-flex>

    </v-layout>
</template>

<script>
    import timeline from "../services/timeline"
    import event from "./Event"

    export default {
        components: {
            event: event
        },
        data: function () {
            return {
                bookmark: null,
                items: [],
                keywords: "",
                scrollTimer: null,
                timer: null
            }
        },
        methods: {
            handleScroll: function (e) {
                if (this.scrollTimer) {
                    window.clearTimeout(this.scrollTimer)
                }
                this.scrollTimer = setTimeout(() => {
                    const percentScrolled = 100.0 * ((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight)
                    if (percentScrolled > 80) {
                        this.loadNextSetOfData()
                    }
                }, 500)
            },
            loadNextSetOfData: async function () {
                if (this.bookmark) {
                    const data = await timeline.generalSearch({
                        search: this.keywords,
                        bookmark: this.bookmark
                    })
                    if (data.docs.length > 0) {
                        this.items = this.items.concat(data.docs)
                        this.bookmark = data.bookmark
                    } else {
                        this.bookmark = null
                    }
                }
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
