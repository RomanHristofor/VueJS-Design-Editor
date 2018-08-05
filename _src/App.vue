<template>
    <v-app>
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

    // import MenuComponents from './components/MenuPage/MenuComponents';
    // import GeneralComponents from './components/GeneralPage/GeneralComponents';
    // import SearchComponents from './components/SearchPage/SearchComponents';
    // import BlogCategories from './components/BlogPage/Categories';
    // import BlogPage from './components/BlogPage/Page';
    // import BlogPost from './components/BlogPage/Post';
    // import BlogSlider from './components/BlogPage/BlogSlider';
    // import ShopCategories from './components/ShopPage/ShopCategories';
    // import ShopCatalog from './components/ShopPage/ShopCatalog';
    // import ShopProduct from './components/ShopPage/ShopProduct';
    // import ShopOrder from './components/ShopPage/ShopOrder';
    // import ShopPreOrder from './components/ShopPage/ShopPreOrder';

    export default {
        name: 'App',
        components: {
            Navigation,
            PageComponents,
            // MenuComponents,
            // GeneralComponents,
            // SearchComponents,
            // BlogCategories,
            // BlogPage,
            // BlogPost,
            // BlogSlider,
            // ShopCategories,
            // ShopCatalog,
            // ShopProduct,
            // ShopOrder,
            // ShopPreOrder,
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
