import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import E404 from '@/components/E404';

import Site from '@/components/Site';
import Blog from '@/components/Blog';

import { store } from '@/store';

Vue.use(Router);

export const router = new Router({
    routes: [
        {
            path: '',
            redirect: { name: 'site' },
        },
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
        },
        {
            path: '*',
            component: E404,
        },
        {
            path: '/blog',
            component: Blog,
        },
        {
            path: '/site',
            name: 'site',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/loadSettings');
                next();
            },
        },
    ],
    mode: 'history',
});

