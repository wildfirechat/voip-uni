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
import VConsole from "vconsole";
import wfc from "@/wfc/client/wfc";

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
        // app server
        const appServer = decodeURIComponent(urlParams.get('appServer'));
        if (appServer) {
            conferenceApi.appServer = appServer;
        }
        const authToken = urlParams.get('authToken');

        let imServerAddress = decodeURIComponent(urlParams.get('server'));
        let userId = urlParams.get('userId');
        let clientId = urlParams.get('clientId');
        let token = urlParams.get('token');

        let debug = urlParams.get('debug');
        if (debug === 'true') {
            new VConsole();
            avenginekitproxy.debug = true;
        }

        token = token.replaceAll('.', '+').replaceAll('_', '/').replaceAll('-', '=');
        console.log('Voip-uni created', this.type, userId, authToken, clientId, token, imServerAddress, debug)
        wfc.setupShortLink(imServerAddress, userId, clientId, token)

        let options = urlParams.get('options');
        options = JSON.parse(decodeURIComponent(options));

        console.log('options', options);
        this.$nextTick(() => {
            if (options.event === 'message' && options.args.participants) {
                console.log('getUserInfos', options.args.participants)
                wfc.getUserInfosEx(options.args.participants, userInfos => {
                    options.args.participantUserInfos = userInfos;
                    console.log('getUserInfosEx success', userInfos);
                    window.msgFromUniapp(options);
                }, err => {
                    console.log('getUserInfosEx error', err, options.args.participants);
                    window.msgFromUniapp(options);
                })

            } else {
                window.msgFromUniapp(options);
            }
        })

        window.addEventListener("hashchange", this.onHashChange);
        window.addEventListener("popstate", () => {
            console.log('on popstate');
            if (location.hash) {
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
            this.count++;
        });
        console.log('listener hashchange event');
    },

    methods: {
        onHashChange() {
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
