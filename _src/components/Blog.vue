<template>
    <div>
        <v-tabs
            v-model="active"
            :color="settings.defColor"
            dark
            slider-color="yellow"
        >
            <v-tab
                v-for="n in 3"
                :key="n"
                ripple
            >
                Item {{ n }}
            </v-tab>
            <v-tab-item
                v-for="n in 3"
                :key="n"
            >
                <v-card flat>
                    <v-card-text>{{ text }}</v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
@{{settings.defColor}}@
    </div>
</template>

<script>
//    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'test',
        components: {},
        created(){
            this.$store.dispatch('editor/loadSettings');
        },
        computed: {
//            ...mapGetters('editor', {
//                settings: 'settings'
//            }),
            settings() {
                return this.$store.getters['editor/elemSettings'](1);
            },

        },
        methods: {
            next () {
                const active = parseInt(this.active);
                this.active = (active < 2 ? active + 1 : 0).toString()
            }
        },
        data() {
            return {
                color: 'red',//'#f14f97',
                active: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
                ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
                ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
                ' ut aliquip ex ea commodo consequat.'
            };
        },

    };
</script>
