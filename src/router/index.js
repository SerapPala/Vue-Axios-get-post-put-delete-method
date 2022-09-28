import Vue from 'vue'
import Router from 'vue-router'
import AxiosKullanimi from '@/components/AxiosKullanimi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AxiosKullanimi',
      component: AxiosKullanimi
    }
  ]
})
