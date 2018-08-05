<template>
    <div class="list__tile">
        <div>
            <v-layout row wrap>
                <v-flex xs12 >
                    <span class="demonstration">{{ settings.label }}</span>
                    <v-select
                        :label="currentValue"
                        :items="array"
                        :value="currentValue"
                        item-text="name"
                        class="search ma-0"
                        :prepend-icon="settings.search"
                        clearable
                        solo
                        autocomplete
                        :style="fontFamily"
                        @input="setFontLoaded"
                        @keyup.down="onSelectDownOrUp"
                        @keyup.up="onSelectDownOrUp"
                    >
                        <template slot="item" scope="data">
                            <v-list-tile-content>
                                <span :style="data.item.font">{{ data.item.name }}</span>
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

    export default {
        name: "FontsSelect",
        props: {
            settings: {
                type: Object,
                required: true,
            },
            array: {
                type: Array,
                required: true,
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
                    families: this.family
                },
            });
        },
        computed: {
            currentValue() {
                return this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            }
        },
        methods: {
            onSelectDownOrUp() {
                if (this.settings.search && document.querySelector('.list__tile--highlighted')) {
                    let currentItem = document.querySelector('.list__tile--highlighted').children[0].innerText;
                    this.setFontLoaded({
                        name: currentItem,
                        font: `font-family: ${currentItem}`
                    })
                }
            },
            setFontLoaded(e) {
                if (e) {
                    if (e.font) {
                        this.fontFamily = e.font;
                        WebFontLoader.load({
                            // 'Rubik:n4'  n - normal | i - italic | 1-7 - weight
                            google: {
                                families: [e.name]
                            },
                            // custom: {
                            //     families: [
                            //         e.name,
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
                family: [
                    'Rubik', 'Inconsolata', 'Roboto', 'Montserrat', 'Pacifico',
                    'ABeeZee', 'Abel', 'Abril Fatface', 'Aclonica', 'Acme',
                    'Actor', 'Adamina', 'Advent Pro','Aguafina Script', 'Helvetica',

                    'Akronim', 'Aladin', 'Aldrich', 'Alef',
                    'Alegreya', 'Alegreya SC', 'Alegreya Sans',
                    'Alex Brush', 'Alfa Slab One', 'Alice', 'Alike', 'Alike Angular',
                    'Allan', 'Allerta', 'Allerta Stencil', 'Allura', 'Almendra',
                    'Almendra Display', 'Almendra SC', 'Amarante', 'Amaranth',
                    'Amatic SC', 'Amethysta', 'Amiri', 'Anaheim',
                ]
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
