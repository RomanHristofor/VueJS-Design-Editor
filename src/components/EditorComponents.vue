<template>
    <div>
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

        },
    }
</script>

<style scoped>

</style>
