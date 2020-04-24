import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tim from './commen/tim/tim.js'
import commen from './commen/commen.js'
import TIM from 'tim-js-sdk'
import store from './store/index.js'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

// 配置请求的根路径
axios.defaults.baseURL= 'http://305g7h9125.wicp.vip/v1/lot'

// axios 请求拦截器
axios.interceptors.request.use(config => {
  // 为请求头添加 Token 验证，字段 Authorization
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  // 对请求进行预处理
  return config
})

Vue.config.productionTip = false
Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.$store = store
Vue.prototype.$commen = commen
// 将包挂载到 Vue 的原型对象上
Vue.prototype.$http = axios

Vue.use(BaiduMap , {
  ak:'SWV6FpgZgSHd2j71old3Of0RLV5w9zck'
})
// Vue.use(BmNavigation)
// Vue.use(BmView)
// Vue.use(BmGeolocation)
// Vue.use(BmCityList)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
