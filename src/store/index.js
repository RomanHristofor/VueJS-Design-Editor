/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import menu from './modules/menu';
import editor from './modules/editor';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
export const store = new Vuex.Store({
    modules: {
        // menu,
        editor,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
