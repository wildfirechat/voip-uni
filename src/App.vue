<template>
    <div id="app">
        <Single/>
    </div>
</template>

<script>

import Single from "@/voip/Single.vue";

export default {
    name: 'App',
    components: {
        Single
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
