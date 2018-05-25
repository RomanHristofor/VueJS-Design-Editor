<template>
    <div>
        <v-list-tile-action >
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>

            <el-color-picker
                :value="elemColor.color"
                @change="setColor($event)"
                size="mini"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: 'ColorPicker',
        props: ['settings'],
        created() {
            let elemSettings = {id: ++this.i, color: this.settings.defColor};
            this.$store.dispatch('editor/setElemSettings', elemSettings);
        },
        computed: {
            ...mapGetters('editor', {
                elemColor: 'getCurrentElemColor',
                count: 'getCountElement',
                len: 'getAllElemSettingsLength',
                lastElement: 'getBackElement',
            }),
        },
        methods: {
            setColor(newColor) {
                if (this.count < this.len && this.lastElement) {

                    let newElem = {id: this.i, color: newColor};
                    this.$store.dispatch('editor/replaceElement', newElem);
                    this.$store.dispatch('editor/setCurrentElemColor', newElem);

                } else {
                    let newElem = {id: ++this.i, color: newColor};
                    this.$store.dispatch('editor/setElemSettings', newElem);
                }

                this.disabledBtn(newColor);
            },
            disabledBtn(v) {
                this.$emit('btn-disabled', {
                    next: this.len === this.count,
                    back: v === this.settings.defColor
                });
            }
        },
        data() {
            return {
                i: 0,
            };
        },
    }
</script>

<style scoped>

</style>
