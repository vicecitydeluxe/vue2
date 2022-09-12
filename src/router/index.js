import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/components/LoginForm')
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import(/* webpackChunkName: "layout" */ '@/components/Layout')
    },
    {
        path: '*',
        name: 'incorrect',
        component: () => import(/* webpackChunkName: "layout" */ '@/components/LoginForm')
    },
    {
        path: '/top-up',
        name: 'balance',
        component: () => import(/* webpackChunkName: "layout" */ '@/components/TopupBalance')
    },
    {
        path: '/upload-layout',
        name: 'uploadLayout',
        component: () => import(/* webpackChunkName: "layout" */ '@/components/UploadLayout')
    },
    {
        path: '/uploader',
        name: 'uploader',
        component: () => import(/* webpackChunkName: "layout" */ '@/components/Uploader')
    },
    {
        path: '/mapper',
        name: 'mapper',
        component: () => import(/* webpackChunkName: "layout" */ '@/components/Mapper')
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
