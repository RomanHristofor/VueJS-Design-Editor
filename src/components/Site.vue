<template>
    <div>
        site@{{elemColor}}@
        Element #{{elemWidth}}#
        <v-toolbar dark
                   :style="{ background: elemColor.color }"
        >
            <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>

        <div class="text-xs-center mt-3">
            <v-btn @click.native="next"
                   :style="{ width: elemWidth.width + '%' }"
            >
                next tab
            </v-btn>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'Site',
        computed: {
            ...mapGetters('editor', {
                elemWidth: 'getCurrentElemWidth',
                elemColor: 'getCurrentElemColor',
                // countElement: 'getCountElement',
            }),
        },
        methods: {
            next () {
                const active = parseInt(this.active);
                this.active = (active < 2 ? active + 1 : 0).toString()
            }
        },
        data() {
            return {
                title: 'Site',
                active: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
                ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
                ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
                ' ut aliquip ex ea commodo consequat.'
            };
        },
    };
</script>

<style scoped>

</style>
