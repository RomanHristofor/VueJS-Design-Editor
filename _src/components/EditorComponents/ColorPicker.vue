<template>
    <div>
        <v-list-tile-action >
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>
            <!--@{{elemColor.newValue}}@-->
            <el-color-picker
                :value="currentValue"
                @change="setColor($event)"
                size="mini"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'ColorPicker',
        props: ['settings', 'id'],
        created() {
            this.$store.dispatch('editor/setCurrentElemSettings', {
                id: this.id, field: 'cPicker', newValue: this.settings.defColor,
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
            setColor(newColor) {
                let elemSettings = {
                    id: this.id,
                    field: 'cPicker',
                    newValue: newColor,
                    oldValue: this.currentValue || this.settings.defColor
                };

                if (this.counter < this.elemLength) {
                    this.$store.dispatch('editor/replaceElement', elemSettings);
                }

                this.$store.dispatch('editor/setElemSettings', elemSettings);
                this.$store.dispatch('editor/isDisabledBtn');

                this.$store.dispatch('editor/setCurrentElemSettings', {
                    id: this.id, field: 'cPicker', newValue: newColor
                });
            },
        },
        data: () => {
            return {};
        },
    }
</script>

<style scoped>

</style>
