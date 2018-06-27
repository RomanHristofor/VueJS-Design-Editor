<template>
    <v-container fluid>
        <p>{{ settings.label }}</p>
        <v-radio-group
            :mandatory="false"
            v-model="v"
            :value="currentValue"
            @change="changeValue"
        >
            <v-radio v-if="!settings.picture"
                v-for="(item, i) in settings.array"
                :label="item.label"
                :value="item.v"
            />

            <v-chip
                color="indigo"
                text-color="white"
                v-if="settings.picture"
                v-for="(item, i) in settings.array"
                :style="{ color : selectedItem === item.v ? active : '' }"
                @click="selectedItem = item.v"
            >
                {{ item.v }}
                <v-avatar>
                    <v-radio
                        :class="{ 'radio-hidden': settings.picture }"
                        :value="item.v" >
                    </v-radio>
                    <v-icon v-text="item.src"></v-icon>
                </v-avatar>
            </v-chip>

            <!-- <v-list-tile-avatar
                v-if="settings.picture"
                v-for="(item, i) in settings.array"
            >
                <img :src="item.src">
            </v-list-tile-avatar> -->

        </v-radio-group>
    </v-container>
</template>

<script>
    export default {
        name: 'RadioGroup',
        props: {
            settings: {
                type: Object,
                required: true,
            },
            id: {
                type: Number,
                required: true
            }
        },
        created() {
            this.$store.dispatch('editor/setCurrentElemSettings', {
                id: this.id, name: this.settings.name, newValue: this.settings.defValue,
            });

            this.selectedItem = this.settings.defValue;
        },
        computed: {
            currentValue() {
                let result = this.$store.getters['editor/getCurrentElemSettings'](this.id).newValue;
                this.selectedItem = result;

                return this.v = result;
            }
        },
        methods: {
            changeValue(v) {
                this.v = v;

                let elemSettings = {
                    id: this.id,
                    name: this.settings.name,
                    newValue: v,
                    oldValue: this.currentValue || this.settings.defValue
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            },
        },
        data: () => {
            return {
                v: '',
                selectedItem: '',
                active: 'tomato !important'
            };
        },
    }
</script>

<style lang="stylus" scoped>

    .radio-hidden
        opacity: 0

</style>
