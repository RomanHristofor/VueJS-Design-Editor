<template>
    <div>

        <history />

        <v-list-tile
            v-for="(item, i) in elements"
        >
            <fonts-select
                v-if="item.fontSelect"
                :settings="item"
                :array="item.array"
                :id="item.id"
            />

            <slider
                v-if="item.slider"
                :settings="item"
                :id="item.id"
            />

            <color-picker
                v-if="item.colorPicker"
                :settings="item"
                :id="item.id"
            />

            <select-compo
                v-if="item.selectComposite"
                :settings="item"
                :components="item.components"
                :id="item.id"
            />

            <switch-component
                v-if="item.switch"
                :settings="item"
                :id="item.id"
            />

            <radio-component
                v-if="item.radio"
                :settings="item"
                :id="item.id"
            />

            <!--<chrome-->
                <!--v-if="item.opacity"-->
                <!--:value="item.defColor"-->
            <!--/>-->

        </v-list-tile>
    </div>
</template>

<script>
    import History from './History';
    import FontsSelect from './GeneralSettings/FontsSelect';
    import SwitchComponent from './GeneralSettings/Switch';
    import RadioComponent from './GeneralSettings/RadioGroup';
    import ColorPicker from './EditorComponents/ColorPicker';
    import Slider from './EditorComponents/Slider';
    import SelectCompo from './Сomposite/SelectComposite';
    // import { Chrome } from 'vue-color';

    export default {
        name: 'GeneralComponents',
        props: {
            elements: {
                type: Array,
                required: true
            }
        },
        components: {
            History,
            FontsSelect,
            ColorPicker,
            Slider,
            SelectCompo,
            SwitchComponent,
            RadioComponent,
        },
        methods: {

        },
        data() {
            return {};
        },
    };
</script>

<style >
    .list__tile {
        margin-bottom: 10px !important;
        min-height: 40px;
        height: auto !important;
    }
</style>
