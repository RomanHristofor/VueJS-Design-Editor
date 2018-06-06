<template>
    <div>
        <v-list-tile-action>
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>
            <!--@{{elemWidth.newValue}}@-->
            <v-slider
                :value="elemWidth.newValue"
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
            let elemSettings = {
                id: this.id,
                field: 'width',
                newValue: this.elemWidth.newValue || +this.settings.defWidth,
                oldValue: +this.settings.defWidth
            };
            this.$store.dispatch('editor/setElements', elemSettings);
        },
        computed: {
            ...mapGetters('editor', {
                elemWidth : 'getReadElemWidth',
                counter   : 'getCounter',
                elemLength: 'getElemSettingsLength',
            }),
        },
        methods: {
            setWidth(newWidth) {
                // if( !Number.isNaN( newWidth ))
                let elemSettings = {
                    id: this.id,
                    field: 'width',
                    newValue: parseInt(newWidth, 10) || +this.settings.defWidth,
                    oldValue: this.elemWidth.newValue
                };

                if (this.counter < this.elemLength) {
                    this.$store.dispatch('editor/replaceElement', elemSettings);
                }

                this.$store.dispatch('editor/setElemSettings', elemSettings);
                this.$store.dispatch('editor/setElements', elemSettings);
            },
        },
        data() {
            return {};
        },
    };
</script>

<style scoped>

</style>
