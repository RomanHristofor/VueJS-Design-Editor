<template>
    <v-container fluid>
        <v-flex>
            <v-text-field
                outline
                clearable
                required
                :label="settings.label"
                :counter="settings.maxLength"
                :maxLength="settings.maxLength"
                :value="currentValue"
                @input="changeValue"
                :rules="[rules.required]"
            />
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: 'Input',
        props: {
            settings: {
                type: Object,
                required: true,
            },
            id: {
                type: Number,
                required: true
            }
        },
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
            changeValue(v) {
                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: v,
                    oldValue: this.currentValue || this.settings.defValue,
                    selector: this.settings.selector,
                    css: this.settings.css,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            },
        },
        data: () => {
            return {
                rules: {
                    required: (value) => !!value || 'Required.'
                }
            };
        },
    }
</script>

<style scoped>

</style>
