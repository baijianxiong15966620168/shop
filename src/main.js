import Vue from 'vue'
import App from './App.vue'
import router from '@/views/router/index.js'
import '@/assets/css/index.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
