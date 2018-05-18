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
            >
                <v-icon>thumb_up</v-icon>
            </v-btn>

            <v-btn flat icon
                   color="red lighten-2"
                   @click="back"

            >
                <v-icon>thumb_down</v-icon>
            </v-btn>

            <v-subheader></v-subheader>
        </v-flex>

        <!--ED currentWidth #{{currentWidth}}#  countWidth @{{countWidth}}@-->
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
    import { mapActions } from 'vuex';

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
            ...mapGetters('editor', {
                countWidth: 'getWidthID',
                currentWidth: 'getCurrentWidth',
            }),
        },
        methods: {
            back(e) {
                this.$store.dispatch('editor/decrementWidth');

                this.v = this.$store.getters['editor/elemWidth'](this.countWidth).width;

                this.$store.dispatch('editor/setCurrentWidth', this.v);

            },
            next() {
                debugger
                this.$store.dispatch('editor/incrementWidth');
            }
        },
        data() {
            return {
                count: 0,
                isDisabledBack: true,
                v: ''
            };
        },
    }
</script>

<style scoped>

</style>
