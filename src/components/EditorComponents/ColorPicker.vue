<template>
    <div>
        <v-list-tile-action >
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>

            <el-color-picker
                v-model="v"
                :value="v"
                @change="setColor({ color: v })"
                size="mini"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: "ColorPicker",
        props: ['settings'],
        created(){
            this.$store.dispatch('editor/setColor', {
                color: this.settings.defColor
            });
        },
        computed: {

        },
        methods: {
            ...mapActions('editor', {
                setColor: 'setColor'
            }),
        },
        data() {
            return {
                v: this.settings.defColor,
            };
        },
    }
</script>

<style scoped>

</style>
