import Vue from 'vue'
import Router from 'vue-router'
import Days from '@/components/Days'
import Month from '@/components/Month'
import Add from '@/components/Add'

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/', redirect:'/days' },
    
    { path: '/month', name:'month', component: Month },
    { path: '/days',  name:'days',  component: Days },
    { path: '/add',   name:'add',   component: Add },
  ]
})
