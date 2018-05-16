<template>
    <div>
        <v-list-tile-action >
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content >

            <v-slider
                v-model="v"
                :value="v"
                step="0"
                @input="setWidth(parseInt(v, 10))"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Slider",
        props: ['settings'],
        methods: {
            ...mapActions('editor', {
                setWidth: 'setWidth'
            }),
        },
        data() {
            return {
                v: this.settings.defWidth,
            };
        },
    }
</script>

<style scoped>

</style>
