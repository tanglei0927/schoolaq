import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import http from '@/components/unitls/http.js'
Vue.prototype.$http=http
import untils from '@/components/unitls/untils.js'
Vue.prototype.$untils=untils
Vue.prototype.$imgurl="https://request.zhixiangxiaoche.com/"
// Vue.prototype.$imgurl="http://192.168.0.115:3326/"
// Vue.prototype.$imgurl="http://zhixiang.runfkj.com/"

import "@/components/style/resetm.css"


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
