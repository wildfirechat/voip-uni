import Vue from 'vue'
import App from "@/App.vue";
import avenginekitproxy from "@/wfc/av/engine/avenginekitproxy";
import VueContext from "vue-context";
import '@/assets/fonts/icomoon/style.css'
import './style.css'

Vue.config.productionTip = false

let requestId = 0;
let cbWrapperMap = new Map();
let cbMap = new Map();

avenginekitproxy.listenVoipEvent('getUserIdResult', (event, args) => {
    let {requestId, error, userId} = args;
    let cb = cbMap.get(requestId)
    if (cb) {
        if (!error) {
            cb(userId);
        }
        cbMap.delete(requestId);
    }
})
avenginekitproxy.listenVoipEvent('getUserInfoResult', (event, args) => {
    let {requestId, error, userInfo} = args;
    let cbs = cbWrapperMap.get(requestId)
    if (cbs) {
        if (!error) {
            cbs.successCB(userInfo);
        } else {
            cbs.failCB(error);
        }
        cbWrapperMap.delete(requestId);
    }
})
avenginekitproxy.listenVoipEvent('pickGroupMembersResult', (event, args) => {
    let {requestId, error, users} = args;
    let cb = cbMap.get(requestId)
    if (cb) {
        if (!error) {
            cb(users);
        }
        cbMap.delete(requestId);
    }
})

Vue.prototype.$getUserId = (successCB) => {
    cbMap.set(requestId, successCB);
    avenginekitproxy.emitToMain('getUserId', {
        requestId: requestId++
    })
}

Vue.prototype.$getUserInfo = (userId, successCB, failCB) => {
    cbWrapperMap.set(requestId, {successCB, failCB});
    avenginekitproxy.emitToMain('getUserInfo', {
        userId: userId,
        requestId: requestId++
    })
}

Vue.prototype.$pickGroupMembers = (groupId, initialCheckedUsers, uncheckableUsers, successCB) => {
    cbMap.set(requestId, successCB)
    avenginekitproxy.emitToMain('pickGroupMembers', {
        groupId,
        initialCheckedUsers,
        uncheckableUsers,
        requestId: requestId++
    })
}

Vue.prototype.$inviteConferenceParticipant = inviteMessageContent => {
    avenginekitproxy.emitToMain('inviteConferenceParticipant', {
        inviteMessageContent
    })
}

Vue.prototype.$eventBus = new Vue();

Vue.use(VueContext);
Vue.component("vue-context", VueContext)

new Vue({
    render: h => h(App),
}).$mount('#app')
