import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
import Layout from "@/components/Layout";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
