import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import InputMask from 'primevue/inputmask';
import RadioButton from 'primevue/radiobutton';
import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel';
import ToggleButton from 'primevue/togglebutton';


import 'primevue/resources/themes/md-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./index.scss";

Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('FileUpload', FileUpload);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('Dropdown', Dropdown);
Vue.component('Checkbox', Checkbox);
Vue.component('InputMask', InputMask);
Vue.component('RadioButton', RadioButton);
Vue.component('ProgressSpinner', ProgressSpinner);
Vue.component('SelectButton', SelectButton);
Vue.component('Panel', Panel);
Vue.component('ToggleButton', ToggleButton);

Vue.use(PrimeVue);


Vue.config.productionTip = false
// Vue.config.silent = true;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
