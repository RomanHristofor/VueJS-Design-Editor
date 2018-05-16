import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu';
import editor from './modules/editor';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        menu,
        editor,
    },
    strict: process.env.NODE_ENV !== 'production',
});
