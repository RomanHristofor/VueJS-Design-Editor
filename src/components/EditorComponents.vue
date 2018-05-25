<template>
    <div>
        <v-flex xs4>
            <!--<v-btn color="orange darken-2"-->
                   <!--dark-->

            <!--&gt;-->
                <!--&lt;!&ndash;<router-link :to="{name: 'editor'}">Start from main page</router-link>&ndash;&gt;-->
                <!--<v-icon dark left>arrow_back</v-icon>Back-->
            <!--</v-btn>-->
            <v-btn color="warning"
                   :disabled="isDisabledClearBtn"
                   @click="clearChanges"
                >
                Clear
            </v-btn>

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
             <!--len @{{allElemSettingsLength}}@-->

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
                @btn-disabled="btnDisabled"
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
                count: 'getCountElement',
                lastElement: 'getBackElement',
                allElemSettingsLength: 'getAllElemSettingsLength',
            }),
        },
        methods: {
            back() {
                this.$store.dispatch('editor/setCurrentLength', 'back');
                console.log( '  $$%%%$$$$   back --- lastElement    ', this.lastElement);

                if (this.lastElement.color) {
                    this.$store.dispatch('editor/decrement');

                    this.$store.dispatch(
                        'editor/setCurrentElemColor',
                        this.$store.getters['editor/getCurrentElem'](this.lastElement.id-1, 'color')
                    );
                }

                if (this.lastElement.width >= 0) {
                    this.$store.dispatch('editor/decrement');

                    this.$store.dispatch(
                        'editor/setCurrentElemWidth',
                        this.$store.getters['editor/getCurrentElem'](this.lastElement.id-1, 'width')
                    );
                }

                this.isDisabled();
            },
            next() {
                this.$store.dispatch('editor/setCurrentLength', 'next');

                console.log( '  $$%%%$$$$   next --- lastElement    ', this.lastElement);

                if (this.lastElement.color) {
                    this.$store.dispatch('editor/increment');

                    this.$store.dispatch(
                        'editor/setCurrentElemColor',
                        this.$store.getters['editor/getCurrentElem'](this.lastElement.id, 'color')
                    );
                }

                if (this.lastElement.width >= 0) {
                    this.$store.dispatch('editor/increment');

                    this.$store.dispatch(
                        'editor/setCurrentElemWidth',
                        this.$store.getters['editor/getCurrentElem'](this.lastElement.id, 'width')
                    );
                }

                this.isDisabled();
            },
            isDisabled() {
                this.isDisabledNext = this.count >= this.allElemSettingsLength;
                this.isDisabledBack = this.count <= 2;
            },
            btnDisabled(btnIsDisabled) {
                this.isDisabledBack = btnIsDisabled.back;
                this.isDisabledNext = btnIsDisabled.next;
                this.isDisabledClearBtn = this.count === 2;
            },
            clearChanges() {
                this.$store.dispatch('editor/clearToDefault');
                this.isDisabledClearBtn = this.count === this.allElemSettingsLength;
                this.$store.dispatch(
                    'editor/setCurrentElemColor',
                    this.$store.getters['editor/getCurrentElem'](1, 'color')
                );
                this.$store.dispatch(
                    'editor/setCurrentElemWidth',
                    this.$store.getters['editor/getCurrentElem'](1, 'width')
                );
                this.isDisabled();
            }
        },
        data() {
            return {
                isDisabledBack: true,
                isDisabledNext: true,
                isDisabledClearBtn: true,
            };
        },
    };
</script>

<style scoped>

</style>
