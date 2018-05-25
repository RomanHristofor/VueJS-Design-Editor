<template>
    <div>
        <v-list-tile-action>
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>
            <!--@{{currAction}}@-->
            <v-slider
                :value="elemWidth.width"
                step="0"
                @input="setWidth($event)"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    // import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        name: 'Slider',
        props: ['settings'],
        computed: {
            ...mapGetters('editor', {
                elemWidth: 'getCurrentElemWidth',
                count: 'getCountElement',
                len: 'getAllElemSettingsLength',
                lastElement: 'getBackElement',
            }),
        },
        methods: {
            setWidth(newWidth) {
                if (this.count < this.len && this.lastElement) {

                    let newElem = {id: this.i, width: parseInt(newWidth, 10)};

                    this.$store.dispatch('editor/replaceElement', newElem);
                    this.$store.dispatch('editor/setCurrentElemWidth', newElem);

                } else {
                    // TODO check is NaN  - if( !Number.isNaN( newWidth ))
                    newWidth = newWidth || +this.settings.defWidth;

                    let elemSettings = {id: ++this.i, width: parseInt(newWidth, 10)};
                    this.$store.dispatch('editor/setElemSettings', elemSettings);
                }

                this.disabledBtn(newWidth);
            },
            disabledBtn(v) {
                this.$emit('btn-disabled', {
                    next: this.len === this.count,
                    back: v === +this.settings.defWidth // TODO fix typing
                });
            }
        },
        data() {
            return {
                i: 0,
            };
        },
    };
</script>

<style scoped>

</style>
