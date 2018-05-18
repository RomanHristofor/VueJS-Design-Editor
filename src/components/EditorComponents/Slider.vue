<template>
    <div>
        <v-list-tile-action >
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content >

            <v-slider
                :value="currentWidth"
                step="0"
                @input="setWidth($event)"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        name: "Slider",
        props: ['settings', 'backWidth'],
        computed: {
            ...mapGetters('editor', {
                countWidth: 'getWidthID',
                currentWidth: 'getCurrentWidth',
            }),

        },
        methods: {
            setWidth(newWidth) {
                newWidth = newWidth || +this.settings.defWidth;

                this.$store.dispatch('editor/setWidth', {
                    id: ++this.count, width: parseInt(newWidth, 10)
                });
                // console.log('-- slider countWidth ', this.countWidth);

                this.$store.dispatch('editor/setCurrentWidth', parseInt(newWidth, 10));
            },
        },
        data() {
            return {
                count: 0,
                // v: this.settings.defWidth,
            };
        },
    }
</script>

<style scoped>

</style>
