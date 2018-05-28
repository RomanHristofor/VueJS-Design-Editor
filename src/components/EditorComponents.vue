<template>
    <div>
        <v-flex xs4>
            <v-btn color="warning"
                @click="clearChanges"
                :disabled="isDisabledClear"
            >
                Clear
            </v-btn>

            <v-btn flat icon
                   color="blue lighten-2"
                   @click="next"
                   :disabled="isDisabledBtn.next"
            >
                <v-icon>thumb_up</v-icon>
            </v-btn>

            <v-btn flat icon
                   color="red lighten-2"
                   @click="back"
                   :disabled="isDisabledBtn.back"
            >
                <v-icon>thumb_down</v-icon>
            </v-btn>
            <v-subheader></v-subheader>

            <v-subheader></v-subheader>
        </v-flex>

        <v-list-tile
            v-for="(item, i) in elements"
        >
            <slider v-if="item.slider"
                :settings="item"
                :id="item.id"
            />

            <color-picker v-if="item.cPicker"
                :settings="item"
                :id="item.id"
            />

        </v-list-tile>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Slider from './EditorComponents/Slider';
    import ColorPicker from './EditorComponents/ColorPicker';

    export default {
        name: 'EditorComponents',
        props: ['elements'], // TODO typing fix
        components: {
            Slider,
            ColorPicker,
        },
        computed: {
            ...mapGetters('editor', {
                currentElem: 'getCurrentElement',
                isDisabledBtn: 'getIsDisabledBtn',
                isDisabledClear: 'getIsDisabledClear',
            }),
        },
        methods: {
            back() {
                this.$store.dispatch('editor/setCurrentElem', 'back');

                this.$store.dispatch('editor/setSaveElemSettings', 'back');
                this.$store.dispatch('editor/setElements', this.currentElem);
            },
            next() {
                this.$store.dispatch('editor/setSaveElemSettings', 'next');

                this.$store.dispatch('editor/setCurrentElem', 'next');
                this.$store.dispatch('editor/setElements', this.currentElem);
            },
            clearChanges() {
                this.$store.dispatch('editor/clearAllElemSettings');
                this.$store.dispatch('editor/setElements',
                    this.$store.getters['editor/elemSettings'](2) // TODO fix get cPicker
                );
            },
        },
        data() {
            return {};
        },
    };
</script>

<style scoped>

</style>
