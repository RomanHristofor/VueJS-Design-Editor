<template>
    <div>
        <v-flex xs4>
            <!--<v-btn color="orange darken-2"-->
                   <!--dark-->

            <!--&gt;-->
                <!--&lt;!&ndash;<router-link :to="{name: 'editor'}">Start from main page</router-link>&ndash;&gt;-->
                <!--<v-icon dark left>arrow_back</v-icon>Back-->
            <!--</v-btn>-->

            <v-btn flat icon
                   color="blue lighten-2"
                   @click="next"
                   :disabled="isDisabledNext"
            >
                <v-icon>thumb_up</v-icon>
            </v-btn>

            <v-btn flat icon
                   color="red lighten-2"
                   @click="back"
                   :disabled="isDisabledBack"
            >
                <v-icon>thumb_down</v-icon>
            </v-btn>
            <v-subheader></v-subheader>
            <!--curr W #{{currentWidth}}#-->
            <!--count W @{{countWidth}}@-->
            <v-subheader></v-subheader>
        </v-flex>

        <v-list-tile
            v-for="(item, i) in elements"
        >
            <slider v-if="item.slider"
                :settings="item"
                @btn-disabled="btnDisabled"
            />

            <color-picker v-if="item.cPicker"
                :settings="item"
            />

        </v-list-tile>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    // import { mapActions } from 'vuex';

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
                width: 'width',
                countWidth: 'getWidthID',
                currentWidth: 'getCurrentWidth',
            }),
        },
        methods: {
            back() {
                this.$store.dispatch('editor/decrementWidth');

                this.$store.dispatch(
                    'editor/setCurrentWidth',
                    this.$store.getters['editor/elemWidth'](this.countWidth).width
                );
                // TODO ne DRY
                this.isDisabledNext = !this.width.length > 1;
                this.isDisabledBack = this.countWidth === 1;
            },
            next() {
                this.$store.dispatch('editor/incrementWidth');

                this.$store.dispatch(
                    'editor/setCurrentWidth',
                    this.$store.getters['editor/elemWidth'](this.countWidth).width
                );

                this.isDisabledNext = this.width.length === this.countWidth;
                this.isDisabledBack = this.countWidth === 1;
            },
            btnDisabled(btnIsDisabled) {
                this.isDisabledBack = btnIsDisabled.back;
                this.isDisabledNext = btnIsDisabled.next;
            },
        },
        data() {
            return {
                count: 0,
                isDisabledBack: true,
                isDisabledNext: true,
                v: '',
            };
        },
    };
</script>

<style scoped>

</style>
