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
                <router-link
                    v-for="(item, index) in menuList"
                    :key="index"
                    :to="item.url"
                    @click.native="flag=!flag"
                    active-class="active"
                >
                    <transition name="slide" mode="out-in">
                        <v-list-tile
                            v-if="flag === true"
                        >
                            <v-list-tile-action
                                v-if="item.icon==='bubble_chart'"
                            >
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content
                                v-if="item.text==='Design Editor'"
                            >
                                <v-list-tile-title
                                    v-text="item.text"
                                ></v-list-tile-title>

                            </v-list-tile-content>
                        </v-list-tile>
                    </transition>
                    <transition name="slide" mode="out-in">
                        <v-list-tile
                            v-if="flag !== true"
                        >
                            <v-list-tile-action
                                v-if="item.icon==='home'"
                            >
                                <v-icon class="icon-run">directions_run</v-icon>
                                <!--<v-icon v-html="item.icon"></v-icon>-->
                            </v-list-tile-action>

                            <v-list-tile-content
                                v-if="item.text==='General Settings'"
                            >
                                <v-list-tile-title
                                    v-text="item.text"
                                ></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </transition>
                </router-link>

                <editor-components
                    v-if="elem.page === pageName"
                    v-for="(elem, i) in settings"
                    :elements="elem.elements"
                />

                <general-components
                    v-if="pageName==='home'"
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
            <router-view/>
        </v-content>

        <!--<v-footer :fixed="fixed" app>-->
        <!--<span>&copy; 2017</span>-->
        <!--</v-footer>-->
    </v-app>
</template>

<script>
    import {mapGetters} from 'vuex';

    import EditorComponents from './components/EditorComponents';
    import GeneralComponents from './components/GeneralComponents';

    export default {
        name: 'App',
        components: {
            EditorComponents,
            GeneralComponents,
        },
        computed: {
            ...mapGetters('editor', {
                settings: 'settings',
            }),
            ...mapGetters('menu', {
                menuList: 'items'
            }),
            pageName() {
                return this.$route.name;
            },
        },
        methods: {},
        data() {
            return {
                flag: false,
                title: 'Site',
                // items: [
                //     {
                //         icon: 'home',
                //         text: 'General Settings',
                //     },
                //     {
                //         icon: 'bubble_chart',
                //         text: 'Design Editor',
                //     },
                // ],
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
    .icon-run {
        transform: scale(-1, 1);
    }

    .slide-enter {}

    .slide-enter-active {
        animation: slideIn 0.5s;
    }

    .slide-enter-to {}

    .slide-leave {}

    .slide-leave-active {
        animation: slideOut 0.5s;
    }

    .slide-leave-to {}

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
