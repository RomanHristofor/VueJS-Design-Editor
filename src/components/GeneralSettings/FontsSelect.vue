<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-select
                    label="Fonts"
                    :items="fonts"
                    v-model="v"
                    item-text="name"
                    class="search ma-0"
                    prepend-icon="search"
                    clearable
                    solo
                    autocomplete
                    :style="fontFamily"
                    @input="setFontLoaded"
                >
                    <template slot="item" scope="data">
                        <v-list-tile-content>
                            <span :style="data.item.font">{{ data.item.name }}</span>
                        </v-list-tile-content>
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import WebFontLoader from 'webfontloader';

    export default {
        name: "FontsSelect",
        created() {
            WebFontLoader.load({
                google: {
                    families: this.family
                },
            });
        },
        methods: {
            setFontLoaded(e) {
                this.fontFamily = e ? e.font : '';
                WebFontLoader.load({
                    custom: {
                        families: [
                            'Rubik:n4', // n - normal | i - italic | 1-7 - weight
                            'Inconsolata Regular:n4',
                            'Roboto:i4',
                            'Montserrat:n4',

                        ],
                        urls: ['./static/fonts/fonts.css'],
                    },
                });
            },
        },
        data: () => {
            return {
                v: [],
                fontFamily: '',
                fonts: [
                    { name: 'Rubik', font: "font-family: Rubik" },
                    { name: 'Inconsolata', font: "font-family: Inconsolata" },
                    { name: 'Roboto', font: "font-family: Roboto" },
                    { name: 'Montserrat', font: "font-family: Montserrat" },

                    { name: 'ABeeZee', font: "font-family: ABeeZee" },
                    { name: 'Abel', font: "font-family: Abel" },
                    { name: 'Abril Fatface', font: "font-family: Abril Fatface" },
                    { name: 'Aclonica', font: "font-family: Aclonica" },
                    { name: 'Acme', font: "font-family: Acme" },

                    { name: 'Actor', font: "font-family: Actor" },
                    { name: 'Adamina', font: "font-family: Adamina" },
                    { name: 'Advent Pro', font: "font-family: Advent Pro" },
                    { name: 'Aguafina Script', font: "font-family: Aguafina Script" },

                ],
                family: [
                    'Rubik', 'Inconsolata', 'Roboto', 'Montserrat',
                    'ABeeZee', 'Abel', 'Abril Fatface', 'Aclonica', 'Acme',
                    'Actor', 'Adamina', 'Advent Pro','Aguafina Script',

                    // 'Akronim', 'Aladin', 'Aldrich', 'Alef',
                    // 'Alegreya', 'Alegreya SC', 'Alegreya Sans',
                    // 'Alex Brush', 'Alfa Slab One', 'Alice', 'Alike', 'Alike Angular',
                    // 'Allan', 'Allerta', 'Allerta Stencil', 'Allura', 'Almendra',
                    // 'Almendra Display', 'Almendra SC', 'Amarante', 'Amaranth',
                    // 'Amatic SC', 'Amethysta', 'Amiri', 'Anaheim',
                ]
            }
        }
    }
</script>

<style scoped>
    .input-group.input-group--solo {
        width: 250px;
    }

</style>
