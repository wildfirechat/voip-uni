import Vue from 'vue'
import Single from './voip/Single.vue'
import App from "@/App.vue";
import avenginekitproxy from "@/wfc/av/engine/avenginekitproxy";

Vue.config.productionTip = false

let getUserInfoRequestId = 0;
let getUserInfoCbMap = new Map();

avenginekitproxy.listenVoipEvent('getUserInfoResult', (event, args) => {
    let {requestId, error, userInfo} = args;
    let cbs = getUserInfoCbMap.get(requestId)
    if (cbs) {
        if (!error) {
            cbs.successCB(userInfo);
        } else {
            cbs.failCB(error);
        }
        getUserInfoCbMap.delete(requestId);
    }
})

Vue.prototype.$getUserInfo = (userId, successCB, failCB) => {
    getUserInfoCbMap.set(getUserInfoRequestId, {successCB, failCB});
    avenginekitproxy.emitToMain('getUserInfo', {
        userId: userId,
        requestId: getUserInfoRequestId++
    })
}

new Vue({
    render: h => h(App),
}).$mount('#app')
