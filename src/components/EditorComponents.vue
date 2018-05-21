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
            count !@{{countElement}}@!

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
                elemWidth: 'getCurrentElemWidth',
                elemColor: 'getCurrentElemColor',
                countElement: 'getCountElement',
                lastElement: 'getBackElement',
            }),
        },
        methods: {
            back() {
                console.log( this.lastElement );

                this.$store.dispatch('editor/setCurrentLength', this.countElement);

                if (this.lastElement.color) {
                    this.$store.dispatch('editor/decrementWidth');
                    this.$store.dispatch('editor/setCurrentElemColor', this.lastElement);
                }

                if (this.lastElement.width) { // TODO проверка на 0
                    this.$store.dispatch('editor/decrementWidth');
                    this.$store.dispatch('editor/setCurrentElemWidth', this.lastElement);
                }

                // this.isDisabled();
            },
            next() {
                this.$store.dispatch('editor/incrementWidth');

                // this.$store.dispatch(
                //     'editor/setCurrentSetting',
                //     this.$store.getters['editor/getCurrentElem'](this.countElement)
                // );

                // this.isDisabled();
            },
            isDisabled() {
                this.isDisabledNext = this.allElemSettings.length === this.countElement;
                this.isDisabledBack = this.countElement === 1;
            },
            btnDisabled(btnIsDisabled) {
                // this.isDisabledBack = btnIsDisabled.back;
                // this.isDisabledNext = btnIsDisabled.next;
            },
        },
        data() {
            return {
                count: 0,
                isDisabledBack: false,
                isDisabledNext: false,
                // isDisabledBack: true,
                // isDisabledNext: true,
                v: '',
            };
        },
    };
</script>

<style scoped>

</style>
