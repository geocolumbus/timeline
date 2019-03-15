<template>
    <v-container>
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

        <div v-for="item in items" :key="item._id">
            <v-divider></v-divider>
            <v-layout row flat pt-1 pb-1>
                <v-flex text-xs-center xs2>{{fourchars(item.year)}}-{{twochars(item.month)}}-{{twochars(item.day)}}
                </v-flex>
                <v-flex xs10>{{item.event}}</v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import timeline from "../services/timeline"

    export default {
        data: function () {
            return {
                keywords: "",
                startYear: "",
                endYear: "",
                timer: null,
                items: []
            }
        },
        methods: {
            twochars: function (item) {
                if (!item) return item
                return item.length < 2 ? "0" + item : item
            },
            fourchars: function (item) {
                if (!item) return item
                if (parseInt(item, 10) < 0) {
                    return item
                }
                let ret = item
                while (ret.length < 4) {
                    ret = "0" + ret
                }
                return ret
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
                    this.items = await timeline.generalSearch({
                        search: this.keywords
                    })
                }, 750)
            }
        }
    }
</script>
