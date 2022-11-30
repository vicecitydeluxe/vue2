import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "LoginForm" */ '@/components/LoginForm')
    },
    {
        path: '*',
        name: 'incorrect',
        component: () => import(/* webpackChunkName: "LoginForm" */ '@/components/LoginForm')
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import(/* webpackChunkName: "Layout" */ '@/components/Layout')
    },
    {
        path: '/top-up',
        name: 'balance',
        component: () => import(/* webpackChunkName: "TopupBalance" */ '@/components/TopupBalance')
    },
    {
        path: '/upload-layout',
        name: 'uploadLayout',
        component: () => import(/* webpackChunkName: "UploadLayout" */ '@/components/UploadLayout')
    },
    {
        path: '/uploader',
        name: 'uploader',
        component: () => import(/* webpackChunkName: "Uploader" */ '@/components/Uploader')
    },
    {
        path: '/mapper',
        name: 'mapper',
        component: () => import(/* webpackChunkName: "ColumnMapper" */ '@/components/ColumnMapper')
    },
    {
        path: '/country-mapper',
        name: 'country',
        component: () => import(/* webpackChunkName: "CountryMapper" */ '@/components/CountryMapper')
    },
    {
        path: '/data-analyzer',
        name: 'analyzer',
        component: () => import(/* webpackChunkName: "AsyncDataAnalyzer" */ '@/components/AsyncParts/AsyncDataAnalyzer')
    },
    {
        path: '/result-importer',
        name: 'results',
        component: () => import(/* webpackChunkName: "AsyncResultImporter" */ '@/components/AsyncParts/AsyncResultImporter')
    },
    {
        path: '/leads-finder',
        name: 'finder',
        component: () => import(/* webpackChunkName: "LeadsFinder" */ '@/components/LeadsFinder')
    },
    {
        path: '/filter-sellers',
        name: 'sellers',
        component: () => import(/* webpackChunkName: "SellerFiler" */ '@/components/LeadsFinderParts/SellerFilter')
    },
    {
        path: '/filter-lists',
        name: 'lists',
        component: () => import(/* webpackChunkName: "ListFilter" */ '@/components/LeadsFinderParts/ListFilter')
    },
    {
        path: '/deals-layout',
        name: 'deals',
        component: () => import(/* webpackChunkName: "DealsLayout" */ '@/components/DealsLayout')
    },
    {
        path: '/buy-leads',
        name: 'buy',
        component: () => import(/* webpackChunkName: "LeadsSeller" */ '@/components/LeadsSeller')
    },
    {
        path: '/list-search',
        name: 'list-search',
        component: () => import(/* webpackChunkName: "ListSearcher" */ '@/components/ListSearcher')
    },
    {
        path: '/status-changer',
        name: 'status-changer',
        component: () => import(/* webpackChunkName: "StatusChanger" */ '@/components/StatusChanger')
    },
]

const router = new VueRouter({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})

export default router
