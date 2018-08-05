import Vue from 'vue';
import Router from 'vue-router';
import E404 from '@/components/E404';

import Site from '@/components/Site';

import { store } from '@/store';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: { name: 'empty' },
        },
        {
            path: '*',
            component: E404,
        },
        {
            path: '/',
            name: 'empty',
            component: Site,
        },
        {
            path: '/menu',
            name: 'menu',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/general',
            name: 'general',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/search',
            name: 'search',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/shop/categories',
            name: 'shop-categories',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/shop/catalog',
            name: 'shop-catalog',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/shop/product',
            name: 'shop-product',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/shop/order',
            name: 'shop-order',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/shop/pre-order',
            name: 'shop-pre-order',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/blog/categories',
            name: 'categories',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/blog/page',
            name: 'page',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/blog/post',
            name: 'post',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
        {
            path: '/blog/slider',
            name: 'slider',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
    ],
});
