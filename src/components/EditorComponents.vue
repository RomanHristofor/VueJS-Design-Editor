<template>
    <div>
        <v-flex xs4>
            <v-btn color="orange darken-2"
                   dark
                   @click="resetChanges"
            >
                <v-icon dark left>arrow_back</v-icon>Back
            </v-btn>
            <v-subheader></v-subheader>
        </v-flex>

        <v-list-tile
            v-for="(item, index) in elements"
        >
            <slider v-if="item.slider"
                :settings="item"
            />

            <color-picker v-if="item.cPicker"
                :settings="item"
            />

        </v-list-tile>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Slider from './EditorComponents/Slider';
    import ColorPicker from './EditorComponents/ColorPicker';

    export default {
        name: "EditorComponents",
        props: ['elements'], // TODO typing fix
        components: {
            Slider,
            ColorPicker,
        },
        computed: {

        },
        methods: {
            resetChanges() {
                this.$emit('clear', {
                    color: this.$store.getters['editor/elemSettings'](1).defColor,
                    width: this.$store.getters['editor/elemSettings'](0).defWidth,
                })
            },
        },
    }
</script>

<style scoped>

</style>
