import styles from '../../stylesheet/index.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import vueRoute from '../common/vueRoute'
import Entry from '../../component/entry.vue'
import vueFilter from '../common/vueFilter'
import vueMixin from '../common/vueMixin'
import routePath from '../common/routePath'

vueFilter(Vue)
Vue.mixin(vueMixin())

const routes = [...vueRoute(routePath)]

const router = new VueRouter({
  mode: 'history',
  base: '/t',
  routes
})

Vue.use(VueRouter)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Entry)
})
