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
                    ticks
                    :value="sliderCurrentValue"
                    :step="settings.step"
                    :min="settings.range[switchCurrentValue].min"
                    :max="settings.range[switchCurrentValue].max"
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
                    newValue: this.settings.switchValue
                });
                this.$store.dispatch('editor/setCurrentElemSettings', {
                    id: this.id, name: this.settings.name,
                    newValue: this.settings.range[this.switchCurrentValue].v
                });
            } else {
                this.$store.dispatch('editor/setCurrentElemSettings', {
                    id: this.id, name: this.settings.name, newValue: this.settings.defValue
                });
            }
        },
        computed: {
            currentValue() {
                return this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            },
            sliderCurrentValue() {
                let val = this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;

                if (val > this.settings.range[this.v].max) {
                    return this.settings.range[this.v].v;
                }
                if (val < this.settings.range[this.v].min) {
                    return this.settings.range[this.v].v;
                }
                else {
                    return val;
                }
            },
            switchCurrentValue() {
                this.v = this.$store.getters['editor/getCurrentElemSettings'](this.settings.switchId).newValue;
                this.tile = +_.invert(this.settings.dim)[this.v];
                return this.v;
            }
        },
        methods: {
            changeValueSwitch(v) {
                let elemSettings = {
                    id: this.settings.switchId,
                    name: this.settings.switchName,
                    newValue: this.settings.dim[+v],
                    oldValue: this.switchCurrentValue,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            },
            setWidthSliderUnits: _.debounce(function(newWidth) {
                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: parseInt(newWidth, 10),
                    oldValue: this.sliderCurrentValue || this.settings.range[this.v].v,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);

            }, 100),
            setWidth: _.debounce(function(newWidth) {
                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: parseInt(newWidth, 10),
                    oldValue: this.currentValue || this.settings.defValue
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
