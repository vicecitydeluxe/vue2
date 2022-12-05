import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import browserDetect from "vue-browser-detect-plugin";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import 'primevue/resources/themes/md-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./index.scss";

Vue.component('Toast', Toast);

Vue.use(browserDetect);
Vue.use(PrimeVue);
Vue.use(ToastService);

Vue.config.productionTip = false
// Vue.config.silent = true;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
