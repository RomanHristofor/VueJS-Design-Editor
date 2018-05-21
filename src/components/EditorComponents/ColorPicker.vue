<template>
    <div>
        <v-list-tile-action >
            {{ settings.text }}
        </v-list-tile-action>
        <v-list-tile-content>
            
            <el-color-picker
                :value="elemColor.color"
                @change="setColor($event)"
                size="mini"
            />

        </v-list-tile-content>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: 'ColorPicker',
        props: ['settings'],
        created() {
            this.$store.dispatch('editor/setElemSettings', {
                id: ++this.count, color: this.settings.defColor
            });
        },
        computed: {
            ...mapGetters('editor', {
                elemColor: 'getCurrentElemColor',
            }),
        },
        methods: {
            setColor(newColor) {
                this.$store.dispatch('editor/setElemSettings', {
                    color: newColor
                });
            },
        },
        data() {
            return {
                count: 0,
            };
        },
    }
</script>

<style scoped>

</style>
