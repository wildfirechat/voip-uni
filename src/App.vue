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
        console.log("voip-uni App mounted.");

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let options = urlParams.get('options');
        options = JSON.parse(decodeURIComponent(options));
        console.log('voip options', options)

        let debug = urlParams.get('debug');
        if (debug === 'true') {
            new VConsole();
            avenginekitproxy.debug = true;
        }

        let audioOnly = options.args.audioOnly || (options.args.messageContent && options.args.messageContent.audioOnly);
        console.log('audioOnly', audioOnly)
        this.init(urlParams)
        // navigator.mediaDevices.getUserMedia({video: !audioOnly, audio: true})
        //     .then((stream) => {
        //         stream.getTracks().forEach(track => track.stop())
        //         this.init(urlParams)
        //     })
        //     .catch(reason => {
        //         console.error('需要允许使用摄像头和麦克风，才能进行音视频通话', reason);
        //         let debug = urlParams.get('debug');
        //         if (debug !== 'true') {
        //             window.close();
        //         }
        //     });
    },

    methods: {
        onHashChange() {
            let hash = location.hash;
            console.log('onHashChanged ');
        },
        init(urlParams) {
            this.type = urlParams.get('type');
            // app server
            const appServer = decodeURIComponent(urlParams.get('appServer'));
            if (appServer) {
                conferenceApi.appServer = appServer;
            }
            const authToken = urlParams.get('authToken');
            conferenceApi.authToken = authToken;

            let imServerAddress = decodeURIComponent(urlParams.get('server'));
            let userId = urlParams.get('userId');
            let clientId = urlParams.get('clientId');
            let token = urlParams.get('token');

            token = token.replaceAll('.', '+').replaceAll('_', '/').replaceAll('-', '=');
            wfc.setupShortLink(imServerAddress, userId, clientId, token)

            let options = urlParams.get('options');
            options = JSON.parse(decodeURIComponent(options));

            console.log('options', options);
            // 等待页面mount，并完成相关监听
            this.$nextTick(() => {
                if (options.args.participants) {
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

          // 1. 初始化WebChannel，连接到Qt的交互对象
          new QWebChannel(qt.webChannelTransport, (channel) => {
            // 获取Qt注册的对象（名称与Qt端的registerObject一致）
              console.log('xxxxxxxxxx channel', channel);
            window.qtInterface = channel.objects.qtInterface;

            // 2. 监听Qt发送的信号（Qt端的sendToWeb信号）
            qtInterface.sendToWeb.connect((data) => {
              console.log('on emitToVoip data', data);
              window.msgFromUniapp(JSON.parse(data));
            });

            //3. 通知Qt 已经准备好
            qtInterface.onReady();
          });
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
