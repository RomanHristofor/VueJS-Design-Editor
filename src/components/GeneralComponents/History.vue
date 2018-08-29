<template>
    <div>
        <v-flex>
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

            <v-icon class="customize-icons next"
                    @click="next"
                    :disabled="isDisabledBtn.next"
                    v-text="'fa-arrow-right'"
            ></v-icon>

            <v-icon class="customize-icons"
                    @click="back"
                    :disabled="isDisabledBtn.back"
                    v-text="'fa-arrow-left'"
            ></v-icon>

            <v-subheader></v-subheader>
        </v-flex>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

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
                saveChanges: 'pushCurrentElemSettings',
            }),
        },
        data() {
            return {};
        },
    }
</script>

<style scoped>

    .customize-icons {
        left: 50px;
        top: 110px;
        display: inline-block;
        cursor: pointer;
        width: 30px;
        font-size: 27px;
        color: #cc3b47;
    }

    .next {
        left: 100px;
        color: #6acc3c;
    }

    .customize-icons:hover,
    .next:hover {
        transform: scale(1.3,1.3);
    }

</style>
