import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import E404 from '@/components/E404';

import Site from '@/components/Site';
import Blog from '@/components/Blog';
import ModalGoTo from '@/components/modals/ModalGoTo';

import { store } from '@/store';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: { name: 'home' },
        },
        {
            path: '*',
            component: E404,
        },
        {
            path: '/',
            name: 'home',
            component: HelloWorld,
            beforeEnter(from, to, next) {
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/blog',
            component: Blog,
        },
        {
            path: '/site',
            name: 'site',
            component: Site,
            // component: {
            //     default: Site,
            //     helper: ModalGoTo
            // },
            beforeEnter(from, to, next) {
                store.dispatch('editor/loadSettings');
                next();
            },
        },
    ],
});
