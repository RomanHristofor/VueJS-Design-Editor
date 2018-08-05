<template>
    <div class="list__tile">
        <v-list-tile-action >
            {{ settings.label }}
        </v-list-tile-action>
        <v-list-tile-content class="list__tile__content-small">

            <el-color-picker
                :show-alpha="settings.opacity"
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
                id: this.id, name: this.settings.name, newValue: this.settings.defValue,
                selector: this.settings.selector, css: this.settings.css,
            });
        },
        computed: {
            currentValue() {
                return this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            }
        },
        methods: {
            setColor(newColor) {
                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: newColor,
                    oldValue: this.currentValue || this.settings.defValue,
                    selector: this.settings.selector,
                    css: this.settings.css,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            },
        },
        data: () => {
            return {};
        },
    }
</script>

<style scoped>

</style>
