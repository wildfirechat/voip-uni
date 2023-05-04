import Vue from 'vue'
import Single from './voip/Single.vue'
import App from "@/App.vue";

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
