<template>
    <div>

        <history />

        <v-list-tile
            v-for="(item, i) in elements"
        >
            <slider
                v-if="item.slider"
                :settings="item"
                :id="item.id"
            />

            <fonts-select
                v-if="item.fontSelect"
                :settings="item"
                :array="item.array"
                :id="item.id"
            />

            <color-picker
                v-if="item.colorPicker"
                :settings="item"
                :id="item.id"
            />

        </v-list-tile>
    </div>
</template>

<script>
    import History from './History';
    import Slider from './EditorComponents/Slider';
    import ColorPicker from './EditorComponents/ColorPicker';
    import FontsSelect from './GeneralSettings/FontsSelect';

    export default {
        name: 'EditorComponents',
        props: {
            elements: {
                type: Array,
                required: true
            }
        },
        components: {
            History,
            Slider,
            ColorPicker,
            FontsSelect,
        },
        computed: {},
        methods: {},
        data() {
            return {};
        },
    };
</script>

<style >
    .input-group {
        padding-top: 28px;
    }

    .list__tile {
        margin-bottom: 50px !important;
    }

</style>
