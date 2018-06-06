<template>
    <div>
        <v-list-tile-action>
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>
            <!--@{{v}}@-->
            <v-slider
                :value="currentValue"
                step="0"
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
                id: this.id, field: 'slider', newValue: this.settings.defWidth
            });
        },
        computed: {
            ...mapGetters('editor', {
                counter   : 'getCounter',
                elemLength: 'getElemSettingsLength',
            }),
            currentValue() {
                return this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            }
        },
        methods: {
            setWidth(newWidth) {
                let elemSettings = {
                    id: this.id,
                    field: 'slider',
                    newValue: parseInt(newWidth, 10),
                    oldValue: this.currentValue || this.settings.defWidth
                };

                if (this.counter < this.elemLength) {
                    this.$store.dispatch('editor/replaceElement', elemSettings);
                }

                this.$store.dispatch('editor/setElemSettings', elemSettings);
                this.$store.dispatch('editor/isDisabledBtn');

                this.$store.dispatch('editor/setCurrentElemSettings', {
                    id: this.id, field: 'slider', newValue: parseInt(newWidth, 10)
                });
            },
        },
        data: () => {
            return {};
        },
    };
</script>

<style scoped>

</style>
