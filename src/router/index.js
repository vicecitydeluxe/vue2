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
        component: () => import(/* webpackChunkName: "loginForm" */ '@/components/LoginForm')
    },
    {
        path: '/top-up',
        name: 'balance',
        component: () => import(/* webpackChunkName: "topup" */ '@/components/TopupBalance')
    },
    {
        path: '/upload-layout',
        name: 'uploadLayout',
        component: () => import(/* webpackChunkName: "uploadLayout" */ '@/components/UploadLayout')
    },
    {
        path: '/uploader',
        name: 'uploader',
        component: () => import(/* webpackChunkName: "uploader" */ '@/components/Uploader')
    },
    {
        path: '/mapper',
        name: 'mapper',
        component: () => import(/* webpackChunkName: "colMapper" */ '@/components/ColumnMapper')
    },
    {
        path: '/country-mapper',
        name: 'country',
        component: () => import(/* webpackChunkName: "countryMapper" */ '@/components/CountryMapper')
    },
    {
        path: '/result-importer',
        name: 'results',
        component: () => import(/* webpackChunkName: "resulImporter" */ '@/components/ResultImporter')
    },
    {
        path: '/spinner',
        name: 'spinner',
        component: () => import(/* webpackChunkName: "Spinner" */ '@/components/ImportSpinner')
    },
    {
        path: '/leads-finder',
        name: 'finder',
        component: () => import(/* webpackChunkName: "LeadsFinder" */ '@/components/LeadsFinder')
    },
    {
        path: '/filter-sellers',
        name: 'sellers',
        component: () => import(/* webpackChunkName: "SellerFiler" */ '@/components/SellerFilter')
    },

]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router
