<template>
    <v-app>
        <v-content>
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
