<template>
    <div>
        <v-list-tile-action>
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>
            @{{elemWidth}}@
            <v-slider
                :value="elemWidth.width"
                step="0"
                @input="setWidth($event)"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    // import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        name: 'Slider',
        props: ['settings'],
        computed: {
            ...mapGetters('editor', {
                elemWidth: 'getCurrentElemWidth',
                countElement: 'getCountElement',
            }),
        },
        methods: {
            setWidth(newWidth) {
                // if( !Number.isNaN( newWidth )) {
                    newWidth = newWidth || +this.settings.defWidth;

                    let elemSettings = {id: ++this.count, width: parseInt(newWidth, 10)};

                    this.$store.dispatch('editor/setElemSettings', elemSettings);

                // }
            },
        },
        data() {
            return {
                count: 0,
            };
        },
    };
</script>

<style scoped>

</style>
