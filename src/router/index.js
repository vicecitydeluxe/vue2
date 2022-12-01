import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "LoginForm" */ '@/components/LoginView/LoginForm')
    },
    {
        path: '*',
        name: 'incorrect',
        component: () => import(/* webpackChunkName: "LoginForm" */ '@/components/LoginView/LoginForm')
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import(/* webpackChunkName: "Layout" */ '@/components/MainMenuView/Layout')
    },
    {
        path: '/top-up',
        name: 'balance',
        component: () => import(/* webpackChunkName: "TopupBalance" */ '@/components/BalanceView/TopupBalance')
    },
    {
        path: '/upload-layout',
        name: 'uploadLayout',
        component: () => import(/* webpackChunkName: "UploadLayout" */ '@/components/WizardSection/UploadLayout')
    },
    {
        path: '/uploader',
        name: 'uploader',
        component: () => import(/* webpackChunkName: "Uploader" */ '@/components/WizardSection/Uploader')
    },
    {
        path: '/mapper',
        name: 'mapper',
        component: () => import(/* webpackChunkName: "ColumnMapper" */ '@/components/WizardSection/ColumnMapper')
    },
    {
        path: '/country-mapper',
        name: 'country',
        component: () => import(/* webpackChunkName: "CountryMapper" */ '@/components/WizardSection/CountryMapper')
    },
    {
        path: '/data-analyzer',
        name: 'analyzer',
        component: () => import(/* webpackChunkName: "AsyncDataAnalyzer" */ '@/components/WizardSection/AsyncParts/AsyncDataAnalyzer')
    },
    {
        path: '/result-importer',
        name: 'results',
        component: () => import(/* webpackChunkName: "AsyncResultImporter" */ '@/components/WizardSection/AsyncParts/AsyncResultImporter')
    },
    {
        path: '/leads-finder',
        name: 'finder',
        component: () => import(/* webpackChunkName: "LeadsFinder" */ '@/components/MyListsSection/LeadsFinder')
    },
    {
        path: '/filter-sellers',
        name: 'sellers',
        component: () => import(/* webpackChunkName: "SellerFiler" */ '@/components/MyListsSection/LeadsFinderParts/SellerFilter')
    },
    {
        path: '/filter-lists',
        name: 'lists',
        component: () => import(/* webpackChunkName: "ListFilter" */ '@/components/MyListsSection/LeadsFinderParts/ListFilter')
    },
    {
        path: '/deals-layout',
        name: 'deals',
        component: () => import(/* webpackChunkName: "DealsLayout" */ '@/components/WizardSection/DealsLayout')
    },
    {
        path: '/buy-leads',
        name: 'buy',
        component: () => import(/* webpackChunkName: "LeadsSeller" */ '@/components/MyListsSection/LeadsSeller')
    },
    {
        path: '/list-search',
        name: 'list-search',
        component: () => import(/* webpackChunkName: "ListSearcher" */ '@/components/MyListsSection/ListSearcher')
    },
    {
        path: '/status-changer',
        name: 'status-changer',
        component: () => import(/* webpackChunkName: "StatusChanger" */ '@/components/MyListsSection/ListSearcherParts/StatusChanger')
    },
]

const router = new VueRouter({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})

export default router
