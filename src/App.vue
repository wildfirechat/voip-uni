<template>
    <div id="app">
        <Single v-if="type === 'single'"/>
        <Multi v-else-if="type === 'multi'"/>
<!--        <ConferenceInfoView v-else-if="type === 'conference'"/>-->
    </div>
</template>

<script>

import Single from "@/voip/Single.vue";
import Multi from "@/voip/Multi.vue";
import conferenceApi from "@/api/conferenceApi";
// import ConferenceInfoView from "@/voip/conference/ConferenceInfoView.vue";

export default {
    name: 'App',
    components: {
        // ConferenceInfoView,
        Multi,
        Single
    },
    data() {
        return {
            type: '',
        }
    },
    created() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.type = urlParams.get('type');
        const authToken = urlParams.get('authToken');
        let callId = urlParams.get('callId');
        let pin = urlParams.get('pin');
        conferenceApi.authToken = authToken;
        console.log('Voip-uni created', this.type, authToken, callId, pin)

        // callId = 'ooo';
        // pin = '';
        // if (this.type === 'conference') {
        //     conferenceApi.queryConferenceInfo(callId, pin)
        //         .then(info => {
        //             console.log('conferenceInfo', info);
        //         })
        //         .catch(e => {
        //             console.error('queryConferInfo error', e);
        //         })
        // }
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
