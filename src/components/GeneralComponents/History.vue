<template>
    <div>
        <v-flex xs4>
            <v-btn color="success"
                   @click="saveChanges()"
                   :disabled="isDisabledClear"
            >
                Save
            </v-btn>
            <v-btn color="warning"
                   @click="clearChanges({history:'clear'})"
                   :disabled="isDisabledClear"
            >
                Clear
            </v-btn>

            <!--<v-btn color="error"
                   @click=""
                   :disabled=""
            >
                Reset //после нажатия на кнопку Save
            </v-btn> -->

            <v-btn flat icon
                   color="blue lighten-2"
                   @click="next"
                   :disabled="isDisabledBtn.next"
            >
                <v-icon>thumb_up</v-icon>
            </v-btn>

            <v-btn flat icon
                   color="red lighten-2"
                   @click="back"
                   :disabled="isDisabledBtn.back"
            >
                <v-icon>thumb_down</v-icon>
            </v-btn>
            <v-subheader></v-subheader>
        </v-flex>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {saveSettings} from '../../Actions/loads';

    export default {
        name: 'History',
        computed: {
            ...mapGetters('editor', {
                isDisabledBtn: 'getIsDisabledBtn',
                isDisabledClear: 'getIsDisabledClear',
                data: 'getData',
            }),
        },
        methods: {
            back() {
                this.$store.dispatch('editor/setCurrentElem', 'back');

                this.$store.dispatch('editor/setSaveElemSettings', 'back');
                this.$store.dispatch('editor/isDisabledBtn');
            },
            next() {
                this.$store.dispatch('editor/setSaveElemSettings', 'next');

                this.$store.dispatch('editor/setCurrentElem', 'next');
                this.$store.dispatch('editor/isDisabledBtn');
            },
            ...mapActions('editor', {
                clearChanges: 'clearChangesElemSettings',
                // saveChanges: 'pushCurrentElemSettings',
            }),
            saveChanges() {
                // saveSettings(this.$http, this.$alert);
                this.$http({
                    method: 'post',
                    url: 'api/editor',
                    data: {
                        setting: JSON.stringify(this.data),
                    },
                })
                    .then(({data}) => {
                            if (data.errors === false && data.data) {

                            } else {
                                this.$alert.danger({
                                    message: data.errors,
                                });
                            }
                        },
                        (reason) => {
                            this.$alert.danger({
                                message: reason,
                            });
                        },
                    );
            },
        },
        data() {
            return {};
        },
    }
</script>

<style scoped>

</style>
