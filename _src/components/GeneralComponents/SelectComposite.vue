<template>
    <div class="list__tile">
        <div>

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
                v-if="item.show || (item.type === 'colorPicker' && (isPickerShow && !item.show))"
                :settings="item"
                :id="item.id"
            />

            <slider
                v-if="item.type ==='slider' && isSliderShow"
                :settings="item"
                :id="item.id"
            />
        </v-list-tile>
        </div>
    </div>
</template>

<script>

    import ColorPicker from './ColorPicker';
    import Slider from './Slider';
    // import FontsSelect from '../GeneralComponents/FontsSelect';

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
                id: this.id, name: this.settings.name, newValue: this.settings.defValue
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
                // check for Фон записи - blog/page
                if (e.name === 'цвет фона') {
                    this.isPickerShow = true;
                }
                if (e.name === 'использовать фон сайта') {
                    this.isPickerShow = false;
                }
                // check for Обводка полей или кнопки - shop/order
                if (e.name === 'цвет полей' || e.name === 'цвет обводки кнопки') {
                    this.isPickerShow = true;
                    this.isSliderShow = false;
                }
                if (e.name === 'толщина линии' || e.name === 'толщина обводки кнопки') {
                    this.isSliderShow = true;
                    this.isPickerShow = false;
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

</style>
