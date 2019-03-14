<template>
    <v-container>
        <v-text-field v-model="keywords" hint="Keyword search"></v-text-field>
        <v-layout row pb-2 v-for="item in items" :key="item._id">
            <v-flex xs2>{{item.month}}-{{item.day}}-{{item.year}}</v-flex>
            <v-flex xs10>{{item.event}}</v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import timeline from "../services/timeline"

    export default {
        data: function () {
            return {
                keywords: "",
                timer: null,
                items: []
            }
        },
        watch: {
            keywords: function () {
                window.clearTimeout(this.timer)
                this.timer = setTimeout(async () => {
                    this.items = await timeline.generalSearch({
                        search: this.keywords
                    })
                }, 750)
            }
        }
    }
</script>
