<template>
    <div>
    <!--<iframe id="vigbo-cms"-->
            <!--ref="iframeContent"-->
            <!--src="http://vigbocms.loc"-->
            <!--frameborder="0"-->
            <!--allowfullscreen-->
            <!--@load="iframeStyles"-->
    <!--&gt;-->
        <!--<p>Your browser does not support iframes.</p>-->

        <v-flex
            v-for="(item, i) in elemSettings"
            :key="i"
        >
            <v-toolbar dark
                       v-if="item.field === 'cPicker' && item.id===0"
                       :style="{ background: item.newValue }"
            >
                <v-toolbar-title
                    class="white--text"
                >
                    {{ title }}
                </v-toolbar-title>
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
                <v-btn
                    v-if="item.field === 'slider' && item.id===1"
                    @click.native="next"
                    :style="{ width: item.newValue + '%' }"
                >
                    next tab
                </v-btn>
            </div>

            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card
                        v-if="item.field === 'cPicker' && item.id===3"
                        :style="{ background: item.newValue }"
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
                <v-btn
                    v-if="item.field === 'slider' && item.id===2"
                    color="success"
                    @click.native="success"
                    :style="{ width: item.newValue + '%' }"
                >
                    Success
                </v-btn>
            </div>
        </v-flex>

    <!--</iframe>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'Site',
        computed: {
            ...mapGetters('editor', {
                elemSettings: 'getElemSettings'
            }),
        },
        methods: {
            iframeStyles() {
                this.frame = this.$refs.iframeContent.contentWindow;

                const style =
                    `
                     body { width: ${this.width} %; }
                    .shop-menu-item > a { color: ${this.color} !important; }

                    `;
                // console.log(style);
                this.frame.postMessage(style, '*');
            }
        },
        data() {
            return {
                width: 100,
                color: '#e8078b',
                title: 'Site',
            };
        },
    };
</script>

<style scoped>
    #vigbo-cms {
        width: 100%;
        height: 100%;
    }

</style>
