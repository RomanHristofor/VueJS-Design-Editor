<template>
    <div class="">

        <v-container fluid>
            <v-switch
                color="success"
                :label="settings.label"
                v-model="v"
                :value="currentValue"
                @change="changeValue"
            />
        </v-container>

        <v-list-tile
            v-if="isPickerShow || isSliderShow"
            v-for="(item, i) in components"
        >
            <color-picker
                v-if="item.type === 'colorPicker' && isPickerShow"
                :settings="item"
                :id="item.id"
            />

            <slider
                v-if="item.type === 'slider' && isSliderShow"
                :settings="item"
                :id="item.id"
            />
        </v-list-tile>

    </div>
</template>

<script>
    import ColorPicker from './ColorPicker';
    import Slider from './Slider';

    export default {
        name: 'SwitchComposite',
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
                id: this.id, name: this.settings.name, newValue: this.settings.value,
                selector: this.settings.selector, css: this.settings.css,
            });
        },
        computed: {
            currentValue() {
                return this.v = this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            }
        },
        watch: {
            v (newV, oldV) {
                if (oldV !== newV) {
                    this.showComponents(this.settings.tag, newV);
                }
            }
        },
        methods: {
            showComponents(tag, flag) {
                if (tag === 'enable-slide-show') {
                    this.isSliderShow = flag;
                    this.isPickerShow = false;
                }
                if (tag === 'enable-buttons' || tag === 'enable-arrows') {
                    this.isSliderShow = false;
                    this.isPickerShow = flag;
                }
            },
            changeValue(v) {
                this.v = v;

                this.showComponents(this.settings.tag, this.v);

                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: v,
                    oldValue: this.currentValue,
                    selector: this.settings.selector,
                    css: this.settings.css,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            }
        },
        data: () => {
            return {
                v: '',
                isSliderShow: false,
                isPickerShow: false,
            };
        },
    }
</script>

<style scoped>

</style>
