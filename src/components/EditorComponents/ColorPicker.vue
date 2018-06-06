<template>
    <div>
        <v-list-tile-action >
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>
            <!--@{{elemColor.newValue}}@-->
            <el-color-picker
                :value="elemColor.newValue"
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
            let elemSettings = {
                id: this.id,
                field: 'color',
                newValue: this.elemColor.newValue || this.settings.defColor,
                oldValue: this.settings.defColor
            };
            this.$store.dispatch('editor/setElements', elemSettings);
        },
        computed: {
            ...mapGetters('editor', {
                elemColor : 'getReadElemColor',
                counter   : 'getCounter',
                elemLength: 'getElemSettingsLength',
            }),
        },
        methods: {
            setColor(newColor) {
                let elemSettings = {
                    id: this.id,
                    field: 'color',
                    newValue: newColor || this.settings.defColor,
                    oldValue: this.elemColor.newValue
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
    }
</script>

<style scoped>

</style>
