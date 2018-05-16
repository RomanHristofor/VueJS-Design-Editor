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
                <v-list-tile
                    value="true"
                    v-for="(item, i) in items"
                    :key="i"
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <editor-components
                    v-for="(elem, index) in settings"
                    v-if="elem.page === pageName"
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
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>menu</v-icon>
            </v-btn>
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
    import {mapActions} from 'vuex';

    import EditorComponents from './components/EditorComponents';

    export default {
        name: 'App',
        components: {
            EditorComponents,
        },
        computed: {
            ...mapGetters('editor', {
                settings: 'settings'
            }),
            pageName() {
                return this.$route.name;
            },
        },
        methods: {},
        data() {
            return {
                //color1: '#5468f6',
                clipped: false,
                drawer: true,
                fixed: false,
                items: [{
                    icon: 'bubble_chart',
                    title: 'Design Editor',
                }],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Site',
            };
        },
    };
</script>
