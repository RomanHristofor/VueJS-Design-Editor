<template>
    <iframe id="vigbo-cms"
        ref="iframeContent"
        name="vigbo"
        :src="iFrameURL"
        frameborder="0"
        allowfullscreen
        :settings="changeStyles"
        @load="setIFrameStyles"
    >
        <p>Your browser does not support iframes.</p>
    </iframe>
</template>

<script>
    import { getSettings } from '../Actions/loads';
    import { mapGetters } from 'vuex';

    export default {
        name: 'Site',
        computed: {
            ...mapGetters('editor', {
                elemSettings: 'getElemSettings',
                elemLength: 'getElemSettingsLength',
                iFrameURL: 'getIFrameURL',
            }),
            changeStyles() {
                if (this.elemSettings && this.$refs.iframeContent) {
                    this.setIFrameStyles();
                }
            },
        },
        beforeRouteLeave(to, from, next) {
            if (this.elemLength === 0) {
                next()
            } else {
                next(false)
            }
        },
        methods: {
            setIFrameStyles() {
                this.frame = this.$refs.iframeContent.contentWindow;

                let style = '';
                _.each(this.elemSettings, elem => {
                    if (elem.selector.length && elem.css.length) {
                        for (let i = 0; i < elem.selector.length; i++) {
                            style += `${elem.selector[i]} { ${elem.css[i].replace('%val%', elem.newValue)} }`;
                        }
                    }
                });
                this.frame.postMessage(style, '*');

                // STYLES DEFAULT
                if (this.$route.name === 'empty') {
                    this.frame.postMessage('empty', '*');
                }
            },
        },
        data() {
            return {};
        },
    };
</script>

<style scoped>
    #vigbo-cms {
        width: 100%;
        height: 100%;
    }

</style>
