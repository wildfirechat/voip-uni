<template>
    <div id="app">
        <Single v-if="type === 'single'"/>
        <Multi v-else-if="type === 'multi'"/>
        <conference v-else-if="type === 'conference'"/>
    </div>
</template>

<script>

import Single from "@/voip/Single.vue";
import Multi from "@/voip/Multi.vue";
import conferenceApi from "@/api/conferenceApi";
import Conference from "@/voip/conference/Conference.vue";
import avenginekitproxy from "@/wfc/av/engine/avenginekitproxy";
import appServerApi from "@/api/appServerApi";

export default {
    name: 'App',
    components: {
        Conference,
        Multi,
        Single
    },
    data() {
        return {
            type: '',
            hash: '',
            count: 0,
        }
    },
    created() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.type = urlParams.get('type');
        const authToken = urlParams.get('authToken');
        let callId = urlParams.get('callId');
        let pin = urlParams.get('pin');
        appServerApi.authToken = authToken;
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
        window.addEventListener("hashchange",this.onHashChange);
        window.addEventListener("popstate",()=> {
            console.log('on popstate');
            if(location.hash){
                this.hash = location.hash.split('#')[1];
                history.back();
            } else {
                //hash值最好是编码后的数据
                const prefix = 'data=';
                let data = this.hash.substring(this.hash.indexOf(prefix) + prefix.length)
                data = decodeURIComponent(data);
                window.msgFromUniapp(JSON.parse(data));
                // document.getElementsByTagName('body')[0].innerHTML = '解码后参数：' + this.count + ' ' + data;
            }
            this.count ++;
        });
        console.log('listener hashchange event');
    },

    methods:{
        onHashChange(){
            let hash = location.hash;
            console.log('onHashChanged ');
        }
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
}

body {
    margin: 0;
}
</style>
