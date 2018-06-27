<template>
    <div>
        <v-list-tile-action>
            {{ settings.label }}
        </v-list-tile-action>
        <v-list-tile-content>
            <v-switch
                v-if="settings.units"
                v-model="tile"
                :label="changeUnits"
            />

            <v-slider
                :value="currentValue"
                step="0"
                :min="min"
                :max="max"
                thumb-label
                @input="setWidth($event)"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Slider',
        props: ['settings', 'id'],
        created() {
            this.$store.dispatch('editor/setCurrentElemSettings', {
                id: this.id, name: this.settings.name, newValue: this.settings.defWidth
            });
        },
        computed: {
            changeUnits() {
                return this.dim = this.tile ? 'Px' : '%';
            },
            min() {
                if (this.settings.units) {
                    return this.tile ? this.settings.range.pixel.min : this.settings.range.percent.min;
                } else {
                    return this.settings.min;
                }
            },
            max() {
                if (this.settings.units) {
                    return this.tile ? this.settings.range.pixel.max : this.settings.range.percent.max;
                } else {
                    return this.settings.max;
                }
            },
            currentValue() {
                return this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            }
        },
        methods: {
            setWidth: _.debounce(function(newWidth) {
                if (this.settings.units) {
                    if (newWidth === this.settings.range.pixel.min) {
                        newWidth = this.settings.range.pixel.v;
                    }
                    if (newWidth === this.settings.range.percent.max) {
                        newWidth = this.settings.range.percent.v;
                    }
                }

                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: parseInt(newWidth, 10),
                    oldValue: this.currentValue || this.settings.defWidth
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);

            }, 100)
        },
        data: () => {
            return {
                tile: false,
                dim: '%'
            };
        },
    };
</script>

<style scoped>

</style>
