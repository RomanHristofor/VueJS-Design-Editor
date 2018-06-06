<template>
    <div>
        <!--site@{{elemColor}}@-->
        <!--Element #{{elemWidth}}#-->
        <v-toolbar dark
                   :style="{ background: elemColor.newValue }"
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
                   :style="{ width: elemWidth.newValue + '%' }"
            >
                next tab
            </v-btn>
        </div>

        <!-- <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card
                    :style="{ background: elemColor.newValue }"
                >
                    <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                            <div>Located two hours south of Sydney in the
                                <br>Southern Highlands of New South Wales, ...
                            </div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange">Share</v-btn>
                        <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

        <div class="text-xs-center mt-3">
            <v-btn color="success"
                   @click.native="success"
                   :style="{ width: elemWidth.newValue + '%' }"
            >
                Success
            </v-btn>
        </div> -->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'Site',
        computed: {
            ...mapGetters('editor', {
                elemWidth: 'getReadElemWidth',
                elemColor: 'getReadElemColor',
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
