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
            meta: 'Menu',
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
            meta: 'General',
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
            meta: 'Search',
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
            meta: 'Categories',
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
            meta: 'Catalog',
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
            meta: 'Product',
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
            meta: 'Order',
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
            meta: 'Pre-order',
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
            meta: 'Categories',
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
            meta: 'Page',
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
            meta: 'Post',
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
            meta: 'Slider',
            component: Site,
            beforeEnter(from, to, next) {
                store.dispatch('editor/clearCurrentElemSettings');
                store.dispatch('editor/loadSettings');
                next();
            },
        },
    ],
});
