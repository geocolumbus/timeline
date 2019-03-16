<template>
    <v-app>
        <v-content class="window-height">
            <HelloWorld></HelloWorld>
        </v-content>
    </v-app>
</template>

<script>
    import HelloWorld from "./components/HelloWorld"

    export default {
        name: "App",
        components: {
            HelloWorld
        }
    }
</script>

<style>
    .window-height {
        max-height: calc(100vh - 30px);
        overflow: hidden;
        margin: 10px;
    }
</style>
