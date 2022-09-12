import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';

import 'primevue/resources/themes/md-light-deeppurple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./index.css";

Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('FileUpload', FileUpload);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('Dropdown', Dropdown);

Vue.use(PrimeVue);


Vue.config.productionTip = false
// Vue.config.silent = true;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
