<template>
    <div>

        <history />

        <div
            v-for="(item, i) in elements"
        >
            <color-picker
                v-if="item.type === 'colorPicker'"
                :settings="item"
                :id="item.id"
            />

            <fonts-select
                v-if="item.type === 'fontSelect'"
                :settings="item"
                :array="item.array"
                :id="item.id"
            />

            <slider
                v-if="item.type === 'slider'"
                :settings="item"
                :id="item.id"
            />

            <select-composite
                v-if="item.type === 'selectComposite'"
                :settings="item"
                :components="item.components"
                :id="item.id"
            />

            <switch-component
                v-if="item.type === 'switch'"
                :settings="item"
                :id="item.id"
            />

            <switch-composite
                v-if="item.type === 'switchComposite'"
                :settings="item"
                :components="item.components"
                :id="item.id"
            />

            <radio-component
                v-if="item.type === 'radio'"
                :settings="item"
                :id="item.id"
            />

        </div>
    </div>
</template>

<script>
    import History from './GeneralComponents/History';
    import FontsSelect from './GeneralComponents/FontsSelect';
    import ColorPicker from './GeneralComponents/ColorPicker';
    import Slider from './GeneralComponents/Slider';
    import SelectComposite from './GeneralComponents/SelectComposite';
    import SwitchComponent from './GeneralComponents/Switch';
    import SwitchComposite from './GeneralComponents/SwitchComposite';
    import RadioComponent from './GeneralComponents/RadioGroup';

    export default {
        name: 'Page',
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
            SelectComposite,
            SwitchComponent,
            SwitchComposite,
            RadioComponent,
        },
        methods: {

        },
        data() {
            return {};
        },
    };
</script>
