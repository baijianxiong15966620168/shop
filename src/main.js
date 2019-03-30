import Vue from 'vue'
import App from './App.vue'
import router from '@/views/router/index.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import crumbs from '@/components/crumbs'
import dayjs from 'dayjs'

Vue.filter('timeFilter', (value) => {
  return dayjs(value).format('YYYY-MM-DD HH:ss:mm')
})
Vue.use(Element)
Vue.component('crumbs', crumbs) // 注册为全局组件
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
