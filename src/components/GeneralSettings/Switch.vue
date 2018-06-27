<template>
    <v-container fluid>
        <v-switch
            color="success"
            :label="settings.label"
            v-model="v"
            :value="currentValue"
            @change="changeValue"
        />
    </v-container>
</template>

<script>
    export default {
        name: 'SwitchComponent',
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
            });
        },
        computed: {
            currentValue() {
                return this.v = this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
            }
        },
        methods: {
            changeValue(v) {
                this.v = v;

                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: v,
                    oldValue: this.currentValue || this.settings.defValue
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            },
        },
        data: () => {
            return {
                v: ''
            };
        },
    }
</script>

<style scoped>

</style>
