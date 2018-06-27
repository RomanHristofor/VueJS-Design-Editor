<template>
    <div class="wrapper-select">

        <v-layout row wrap>
            <v-flex xs12 >
                <span class="demonstration">{{ settings.label }}</span>
                <v-select
                    :label="currentValue"
                    :items="settings.options"
                    :value="currentValue"
                    item-text="name"
                    class="search ma-0"
                    :prepend-icon="settings.search"
                    clearable
                    solo
                    autocomplete
                    @input="changeOptions"
                >
                    <template slot="item" scope="data">
                        <v-list-tile-content>
                            <span>{{ data.item.name }}</span>
                        </v-list-tile-content>
                    </template>
                </v-select>
            </v-flex>
        </v-layout>

        <!--<fonts-select
            :settings="settings"
            :array="settings.options"
            :id="id"
        />-->

        <v-list-tile
            v-for="(item, i) in components"
        >
            <color-picker
                v-if="item.show || (item.colorPicker && (isPickerShow && !item.show))"
                :settings="item"
                :id="item.id"
            />

            <slider
                v-if="item.slider && isSliderShow"
                :settings="item"
                :id="item.id"
            />
        </v-list-tile>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import ColorPicker from '../EditorComponents/ColorPicker';
    import Slider from '../EditorComponents/Slider';
    // import FontsSelect from '../GeneralSettings/FontsSelect';

    export default {
        name: "SelectComposite",
        props: {
            settings: {
                type: Object,
                required: true,
            },
            components: {
                type: Array,
                required: true,
            },
            id: {
                type: Number,
                required: true
            }
        },
        components: {
            ColorPicker,
            Slider,
            // FontsSelect,
        },
        created() {
            this.$store.dispatch('editor/setCurrentElemSettings', {
                id: this.id, name: this.settings.name, newValue: this.settings.value
            });
        },
        computed: {
            currentValue() {
                return this.result = this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            }
        },
        watch: {
            result (newV, oldV) {
                if (oldV !== newV) {
                    this.showComponents({
                        name: newV
                    });
                }
            }
        },
        methods: {
            showComponents(e) {
                if (e.name === 'подчеркивание' || e.name === 'зачеркивание') {
                    this.isSliderShow = true;
                    this.isPickerShow = false;
                }
                if (e.name === 'маркер') {
                    this.isPickerShow = true;
                    this.isSliderShow = true;
                }
                if (e.name === 'выделение цветом') {
                    this.isPickerShow = false;
                    this.isSliderShow = false;
                }
            },
            changeOptions(e) {
                if (e) {
                    this.showComponents(e);

                    let elemSettings = {
                        id: this.id,
                        name: this.settings.name,
                        newValue: e.name,
                        oldValue: this.currentValue
                    };

                    this.$store.dispatch('editor/setElemSettings', elemSettings);
                }
            }
        },
        data: () => {
            return {
                result: '',
                isSliderShow: false,
                isPickerShow: false
            };
        },
    }
</script>

<style scoped>

    /*.input-group.input-group--solo {*/
        /*width: 250px;*/
        /*margin-bottom: 50px !important;*/
    /*}*/


</style>
