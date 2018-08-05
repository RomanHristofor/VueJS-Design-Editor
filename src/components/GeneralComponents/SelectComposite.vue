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
        },
        created() {
            this.$store.dispatch('editor/setCurrentElemSettings', {
                id: this.id, name: this.settings.name, newValue: this.settings.defValue,
                selector: this.settings.selector, css: this.settings.css,
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
                    this.showComponents(_.find(this.settings.options, obj => {
                        if (obj.name === newV) return obj;
                    }));
                }
            }
        },
        methods: {
            showComponents(e) {
                if (e.picker) this.isPickerShow = e.picker;
                if (e.slider) this.isSliderShow = e.slider;
                if (!e.picker) this.isPickerShow = e.picker;
                if (!e.slider) this.isSliderShow = e.slider;
            },
            changeOptions(e) {
                if (e) {
                    this.showComponents(e);

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
