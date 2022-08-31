import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

import 'primevue/resources/themes/md-light-deeppurple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./index.css";

Vue.component('InputText', InputText);
Vue.component('Dialog', Dialog);
Vue.component('Password', Password);
Vue.component('Divider', Divider);
Vue.component('Checkbox', Checkbox);
Vue.component('Button', Button);

Vue.use(VueCompositionAPI)
Vue.use(PrimeVue);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
