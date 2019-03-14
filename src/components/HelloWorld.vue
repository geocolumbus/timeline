<template>
    <v-container>
        <v-text-field v-model="keywords" hint="Keyword search"></v-text-field>
    </v-container>
</template>

<script>
    export default {
        data: () => {
            return {
                keywords: {type: "String", default: ""}
            }
        },
        watch: {
            keywords: function () {
                console.log("change!")
            }
        }
    }
</script>

<style>

</style>
