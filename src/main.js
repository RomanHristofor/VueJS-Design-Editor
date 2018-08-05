// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueAlert from '@vuejs-pt/vue-alert';
Vue.use(VueAlert);

// import { cloneDeep } from 'lodash';
// Vue.use(cloneDeep);

import { store } from './store';
import { router } from './router';
import {
    Vuetify,
    VApp,
    VAvatar,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VMenu,
    VDivider,
    VIcon,
    VGrid,
    VDialog,
    VTabs,
    VExpansionPanel,
    VToolbar,
    transitions,
    VCard,
    VDataTable,
    VPagination,
    VForm,
    VTextField,
    VSelect,
    VCheckbox,
    VSwitch,
    VRadioGroup,
    VChip,
    VProgressCircular,
    VProgressLinear,
    VAlert,
    VSubheader,
    VSlider,
    VTimePicker,
    VDatePicker,
} from 'vuetify';
import '../node_modules/vuetify/src/stylus/app.styl';

import { ColorPicker } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import VueResource from 'vue-resource';

Vue.use(Vuetify, {
    components: {
        VApp,
        VAvatar,
        VNavigationDrawer,
        VFooter,
        VList,
        VBtn,
        VMenu,
        VDivider,
        VIcon,
        VGrid,
        VDialog,
        VTabs,
        VExpansionPanel,
        VToolbar,
        transitions,
        VCard,
        VDataTable,
        VPagination,
        VForm,
        VTextField,
        VSelect,
        VCheckbox,
        VSwitch,
        VRadioGroup,
        VChip,
        VProgressCircular,
        VProgressLinear,
        VAlert,
        VSubheader,
        VSlider,
        VTimePicker,
        VDatePicker,
    },
    theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
    },
});
locale.use(lang);
Vue.use(ColorPicker);
Vue.use(VueResource);

// Vue.config.productionTip = false;

// Vue.http.options.root = 'http://domain-name/api/'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    // render: h => h(App),
});
