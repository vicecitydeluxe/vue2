import Vue from 'vue';
import Vuex from 'vuex';
import user from './user.module';
import lists from './lists.module'
import balance from './balance.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        lists,
        balance,
    }
});