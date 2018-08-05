<template>
    <div class="list__tile">
        <div>
            <v-layout row wrap>
                <v-flex xs12 >
                    <span class="demonstration">
                        {{ settings.label }}
                    </span>
                    <v-select
                        :label="currentValue"
                        :items="array || fonts"
                        :value="currentValue"
                        item-text="name"
                        class="search ma-0"
                        :prepend-icon="settings.search"
                        clearable
                        solo
                        autocomplete
                        :style="array ? '' : fontFamily"
                        @input="setFontLoaded"
                        @keyup.down="onSelectDownOrUp"
                        @keyup.up="onSelectDownOrUp"
                    >
                        <template slot="item" scope="data">
                            <v-list-tile-content>
                                <span :style="`font-family:${fontFamily}`">
                                    {{ data.item.name }}
                                </span>
                            </v-list-tile-content>
                        </template>
                    </v-select>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
    import WebFontLoader from 'webfontloader';
    import { mapGetters } from 'vuex';

    export default {
        name: "FontsSelect",
        props: {
            settings: {
                type: Object,
                required: true,
            },
            array: {
                type: Array,
            },
            id: {
                type: Number,
                required: true
            }
        },
        created() {
            this.$store.dispatch('editor/setCurrentElemSettings', {
                id: this.id, name: this.settings.name, newValue: this.settings.defValue,
                selector: this.settings.selector, css: this.settings.css,
            });
            WebFontLoader.load({
                google: {
                    families: _.map(this.fonts, 'name')
                },
            });
        },
        computed: {
            ...mapGetters('editor', {
                fonts: 'getFonts',
            }),
            currentValue() {
                let val = this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
                this.fontFamily = `font-family:${val}`;
                return val;
            }
        },
        methods: {
            onSelectDownOrUp() {
                if (this.settings.search && document.querySelector('.list__tile--highlighted')) {
                    let currentItem = document.querySelector('.list__tile--highlighted').children[0].innerText;
                    this.setFontLoaded(currentItem);
                }
            },
            setFontLoaded(e) {
                if (e) {
                    if (e.font) {
                        this.fontFamily = `font-family:${e.name}`;
                        WebFontLoader.load({
                            // 'Rubik:n4'  n - normal | i - italic | 1-7 - weight
                            google: {
                                families: [e.font]
                            },
                            // custom: {
                            //     families: [
                            //         e,
                            //     ],
                            //     urls: ['./static/fonts/fonts.css'],
                            // },
                        });
                    }

                    let elemSettings = {
                        id: this.id,
                        name: this.settings.name,
                        newValue: e.name,
                        oldValue: this.currentValue,
                        selector: this.settings.selector,
                        css: this.settings.css,
                    };

                    this.$store.dispatch('editor/setElemSettings', elemSettings);
                }

            },
        },
        data: () => {
            return {
                fontFamily: '',
            }
        }
    }
</script>

<style scoped>
    .input-group.input-group--solo {
        width: 250px;
    }

    .demonstration {
        width: 100%;
    }

</style>
