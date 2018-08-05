<template>
    <div class="list__tile">
        <div>
            <v-list-tile-action>
                {{ settings.label }}
            </v-list-tile-action>
            <v-list-tile-content>
                <v-switch
                    v-if="settings.units"
                    :label="switchCurrentValue"
                    v-model="tile"
                    @change="changeValueSwitch"
                />

                <v-slider
                    v-if="settings.units"
                    thumb-label
                    :value="sliderCurrentValue"
                    :step="settings.step"
                    :min="settings.range[initSliderValue].min"
                    :max="settings.range[initSliderValue].max"
                    @input="setWidthSliderUnits($event)"
                />

                <v-slider
                    v-if="!settings.units"
                    thumb-label
                    ticks
                    :value="currentValue"
                    :step="settings.step"
                    :min="settings.min"
                    :max="settings.max"
                    @input="setWidth"
                />

            </v-list-tile-content>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Slider',
        props: ['settings', 'id'],
        created() {
            if (this.settings.units) {
                this.$store.dispatch('editor/setCurrentElemSettings', {
                    id: this.settings.switchId, name: this.settings.switchName,
                    newValue: this.settings.switchValue,
                    selector: this.settings.selector, css: this.settings.css,
                });
                this.$store.dispatch('editor/setCurrentElemSettings', {
                    id: this.id, name: this.settings.name,
                    newValue: this.settings.range[this.initSliderValue].v,
                    selector: this.settings.selector, css: this.settings.css,
                });
            } else {
                this.$store.dispatch('editor/setCurrentElemSettings', {
                    id: this.id, name: this.settings.name, newValue: this.settings.defValue,
                    selector: this.settings.selector, css: this.settings.css,
                });
            }
        },
        computed: {
            currentValue() {
                return this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            },
            sliderCurrentValue() {
                let val = this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;

                if (val > this.settings.range[this.initSliderValue].max) {
                    return this.settings.range[this.initSliderValue].v;
                }
                if (val < this.settings.range[this.initSliderValue].min) {
                    return this.settings.range[this.initSliderValue].v;
                }
                else {
                    return val;
                }
            },
            switchCurrentValue() {
                this.v = this.$store.getters['editor/getCurrentElemSettings'](this.settings.switchId).newValue;
                this.tile = +_.invert(this.settings.dim)[this.v];
                return this.v;
            },
            initSliderValue() {
                return +_.invert(this.settings.dim)[this.switchCurrentValue];
            }
        },
        methods: {
            changeValueSwitch(v) {
                let elemSettings = {
                    id: this.settings.switchId,
                    name: this.settings.switchName,
                    newValue: this.settings.dim[+v],
                    oldValue: this.switchCurrentValue,
                    selector: this.settings.selector,
                    css: this.settings.css,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            },
            setWidthSliderUnits: _.debounce(function(newWidth) {
                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: parseInt(newWidth, 10),
                    oldValue: this.sliderCurrentValue || this.settings.range[this.v].v,
                    selector: this.settings.selector,
                    css: this.settings.css,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);

            }, 100),
            setWidth: _.debounce(function(newWidth) {
                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: parseInt(newWidth, 10),
                    oldValue: this.currentValue || this.settings.defValue,
                    selector: this.settings.selector,
                    css: this.settings.css,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);

            }, 100)
        },
        data: () => {
            return {
                v: '',
                tile: '',
            };
        }
    };
</script>

<style scoped>

</style>
