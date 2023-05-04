<template>
    <div id="app">
        <Single v-if="type === 'single'"/>
        <Multi v-else-if="type === 'multi'"/>
        <!--        <Conference v-else-if="type === 'conference'"/>-->
    </div>
</template>

<script>

import Single from "@/voip/Single.vue";
import Multi from "@/voip/Multi.vue";

export default {
    name: 'App',
    components: {
        Multi,
        Single
    },
    data() {
        return {
            type: '',
        }
    },
    created() {
        console.log('Voip-uni created')
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.type = urlParams.get('type');
        console.log('voip type', this.type);
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
