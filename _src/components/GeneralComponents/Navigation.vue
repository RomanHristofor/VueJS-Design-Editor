<template>
    <div>
        <!--:class="{ 'disabled': pageName === item.path }"-->
        <router-link
            v-for="(item, index) in menu"
            :key="index"
            :to="item.url"
            active-class="active"
            exact
        >
            <v-list-group
                v-if="pageName === 'empty'"
                :prepend-icon="item.icon"
                :class="{ 'not__icon': !item.expand }"
            >
                <!--slide-fade -->
                <!--<transition name="slide-x-transition" >-->
                    <v-list-tile
                        slot="activator"
                        @click="onClickLink(item)"
                    >
                        <modal-links
                            :link="item"
                        >
                            <v-list-tile-title
                                slot="textLink"
                                v-text="item.text"
                            ></v-list-tile-title>
                        </modal-links>

                    </v-list-tile>
                <!--</transition>-->

                <v-list-tile
                    v-for="(link, i) in item.links"
                    :key="i"
                    @click="onClickLink(link)"
                >
                    <v-list-tile-action>
                        <v-icon v-text="link.icon"></v-icon>
                    </v-list-tile-action>

                    <modal-links
                        :link="link"
                    >
                        <v-list-tile-title
                            slot="textLink"
                        >
                            <router-link :to="{name: link.path}">
                                {{link.text}}
                            </router-link>

                        </v-list-tile-title>
                    </modal-links>

                </v-list-tile>
            </v-list-group>
        </router-link>

        <div
            v-if="pageName !== 'empty'"
        >
            <v-list-tile
                @click="onClickLink(routeLink || {path: pageName})"
            >
                <v-list-tile-action>
                    <v-icon v-html="'sort'"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>

                    <modal-links
                        :link="routeLink || {path: pageName}"
                        :eventOpenDialog="eventName"
                    >
                        <v-list-tile-title
                            slot="textLink"
                        >
                            <router-link
                                v-if="elemLength === 0"
                                :to="{name: 'empty'}">
                                {{ pageName }}
                            </router-link>

                            <a class="link__exist-changes"
                               v-else
                            >{{ pageName }}</a>

                        </v-list-tile-title>
                    </modal-links>

                </v-list-tile-content>
            </v-list-tile>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ModalLinks from '../modals/ModalGoTo';

    export default {
        name: 'Navigation',
        components: {
            ModalLinks,
        },
        props: {
            menu: {
                type: Array,
                required: true
            },
        },
        computed: {
            ...mapGetters('editor', {
                isOpenSearch: 'getOpenSearchStatus',
                iFrameURL: 'getIFrameURL',
                elemLength: 'getElemSettingsLength',
            }),
            pageName() {
                return this.$route.name;
            },
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('message', this.get, false)
            })
        },
        methods: {
            get(e) {
                console.log('pathname ', e.data);
                let iFrameElem = document.getElementById('vigbo-cms');

                if (e.data.elem === 'close_search') {
                    this.eventName = e.data.elem;
                    // this.$store.dispatch('editor/clearChangesElemSettings', {history: 'clear'});

                    if (this.elemLength === 0) {
                        this.$store.dispatch('editor/setOpenCloseSearch');
                        window.frames.vigbo.postMessage(this.isOpenSearch, '*');
                        this.$router.push({path: '/'});
                    }
                }
                if (e.data.elem === 'shop_product') { // route for SHOP/products
                    this.$router.push({ path: '/shop/product' });
                    this.isShop = true;
                }
                // if (e.data.elem === 'blog_post') { // TODO add route for BLOG/post

                if (this.$route.path.indexOf('blog') !== -1 &&
                    typeof e.data === 'string' && e.data !== '/blog') {
                    iFrameElem.src = this.iFrameURL + '/blog';
                    this.isShop = false;
                }
                if (!this.isShop && this.$route.path.indexOf('shop') !== -1 &&
                    typeof e.data === 'string' && e.data !== '/') {
                    iFrameElem.src = this.iFrameURL;
                }
            },
            onClickLink(item) {
                this.routeLink = item;

                if (item.path === 'search' && this.$route.name === 'empty') {
                    this.eventName = '';
                    this.$store.dispatch('editor/setOpenCloseSearch');
                    window.frames.vigbo.postMessage(this.isOpenSearch, '*');
                }
                if (item.path === 'empty') {
                    window.frames.vigbo.postMessage(false, '*');
                }

            },
        },
        data() {
            return {
                routeLink: '',
                eventName: '',
                isShop: false,
            };
        },
    }
</script>

<style >
    .link__exist-changes {
        text-decoration: underline;
    }

    .not__icon .list__group__header .list__group__header__append-icon {
        display: none;
    }

    .list__group:not(.not__icon) .list__tile .layout > div:first-child,
    .list__group--active:not(.not__icon) .list__tile .layout > div:first-child {
        padding-left: 40px;
    }

    /*.slide-fade-enter-active {*/
        /*transition: all .2s ease;*/
    /*}*/

    /*.slide-fade-leave-active {*/
        /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*}*/

    /*.slide-fade-enter,*/
    /*.slide-fade-leave-active {*/
        /*padding-left: 10px;*/
        /*opacity: 0;*/
    /*}*/

</style>
