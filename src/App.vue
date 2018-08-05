<template>
    <v-app>
        <vue-alert/>

        <v-navigation-drawer
            persistent
            :mini-variant="miniVariant"
            :clipped="clipped"
            v-model="drawer"
            enable-resize-watcher
            fixed
            app
        >
            <v-list>
                <navigation
                    :menu="links"
                />

                <page-components
                    v-if="elem.page === 'menu' && pageName === 'menu'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'general' && pageName === 'general'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'search' && pageName === 'search'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'blog_categories' && pageName === 'categories'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'blog_page' && pageName === 'page'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'blog_post' && pageName === 'post'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'blog_slider' && pageName === 'slider'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'shop_categories' && pageName === 'shop-categories'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'shop_catalog' && pageName === 'shop-catalog'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'shop_product' && pageName === 'shop-product'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'shop_order' && pageName === 'shop-order'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <page-components
                    v-if="elem.page === 'shop_pre_order' && pageName === 'shop-pre-order'"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />
            </v-list>

        </v-navigation-drawer>
        <v-toolbar
            app
            :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

            <v-spacer></v-spacer>
        </v-toolbar>

        <v-content>
            <transition name="slide" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </v-content>

    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Navigation from './components/GeneralComponents/Navigation';
    import PageComponents from './components/Page';

    export default {
        name: 'App',
        components: {
            Navigation,
            PageComponents,
        },
        computed: {
            ...mapGetters('editor', {
                settings: 'settings',
                elemLength: 'getElemSettingsLength',
                // isOpenSearch: 'getOpenSearchStatus',
            }),
            ...mapGetters('menu', {
                links: 'links'
            }),
            pageName() {
                return this.$route.name;
            },
        },
        methods: {},
        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                miniVariant: false,
                right: true,
                rightDrawer: false,
            };
        },
    };
</script>

<style>
    .vue-alert {
        display: none;
    }

    .vue-alert.alert-danger {
        color: #fff;
        background: #ff5252;
    }

    .vue-alert.alert-danger > p {
        margin: 10px 0;
        padding: 0;
        font-size: 16px;
        text-align: center;
    }

    .vue-alert.fade {
        display: block;
        position: fixed;
        z-index: 1000;
        width: 100%;
        padding-top: 0;
        margin-top: 0;
    }

    .list__tile > div {
        width: 100%;
    }

    .list__tile {
        margin-bottom: 10px !important;
        min-height: 40px;
        height: auto !important;
    }

    .input-group {
        padding-top: 28px;
    }

    .theme--light .list .list__tile--link:hover{
        background: none;
    }

    .input-group.input-group--slider {
        padding-left: 16px;
    }

    .list__tile > .list__tile__content-small{
        width: auto;
        overflow: visible;
    }

    .application.theme--light a.disabled {
        color: #444;
        cursor: no-drop;
    }

    .icon-run {
        transform: scale(-1, 1);
    }

    .slide-enter {
    }

    .slide-enter-active {
        animation: slideIn 0.5s;
    }

    .slide-enter-to {
    }

    .slide-leave {
    }

    .slide-leave-active {
        animation: slideOut 0.5s;
    }

    .slide-leave-to {
    }

    @keyframes slideIn {
        from {
            transform: translateX(-300px);
        }
        to {
            transform: translateX(0px);
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0px);
        }
        to {
            transform: translateX(-300px);
        }
    }
</style>
