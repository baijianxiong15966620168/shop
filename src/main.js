import Vue from 'vue'
import App from './App.vue'
import router from '@/views/router/index.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import crumbs from '@/components/crumbs'

Vue.use(Element)
Vue.component('crumbs', crumbs) // 注册为全局组件
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
