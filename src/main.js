import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import Router from 'vue-router'

Vue.prototype.$axios = Axios
Vue.use(ElementUI,VueAxios,Axios)
Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
