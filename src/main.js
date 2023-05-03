import Vue from 'vue'
import Single from './voip/Single.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(Single),
}).$mount('#app')
