<template>
    <div>
        <v-flex xs4>
            <v-btn color="warning"
                   @click="clearChanges('clear')"
                   :disabled="isDisabledClear"
            >
                Clear
            </v-btn>

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
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'History',
        computed: {
            ...mapGetters('editor', {
                isDisabledBtn: 'getIsDisabledBtn',
                isDisabledClear: 'getIsDisabledClear',
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
                clearChanges: 'isDisabledBtn',
            })
        },
        data() {
            return {};
        },
    }
</script>

<style scoped>

</style>
