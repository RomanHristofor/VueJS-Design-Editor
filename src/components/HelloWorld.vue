<template>
    <v-container fluid>
        <v-flex
            v-for="(item, i) in elemSettings"
            :key="i"
        >
            <v-slide-y-transition mode="out-in"
            >
                <v-layout column align-center
                          v-if="item.name === 'bg-color'"
                          :style="{ background: item.newValue }"
                >
                    <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
                    <blockquote>
                        &#8220;First, solve the problem. Then, write the code.&#8221;
                        <footer>
                            <small>
                                <em>&mdash;John Johnson</em>
                            </small>
                        </footer>
                    </blockquote>
                </v-layout>
            </v-slide-y-transition>
        </v-flex>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Home',
        computed: {
            ...mapGetters('editor', {
                elemSettings: 'getElemSettings',
                elemLength: 'getElemSettingsLength',
            }),
        },
        beforeRouteLeave (to, from, next) {
            if (this.elemLength === 0) {
                next()
            } else {
                next(false)
            }
        },
        methods: {},
        data: () => {
            return {}
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
