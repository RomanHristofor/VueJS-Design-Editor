<template>
    <v-container fluid>
        <p>{{ settings.label }}</p>
        <v-radio-group
            :mandatory="false"
            v-model="v"
            :value="currentValue"
            @change="changeValue"
        >
            <v-radio
                v-if="!settings.picture"
                v-for="(item, i) in settings.array"
                :label="item.label"
                :value="item.v"
            />
                <div v-if="settings.sample"
                    class="view-fields"
                    v-for="(item, i) in settings.array"
                    :style="{ color : selectedItem === item.v ? active : '' }"
                    @click="selectedItem = item.v"
                >
                    <div :class="[ selectedItem === item.v ? 'sample ' + item.className: '' ]"></div>
                </div>

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
                selector: this.settings.selector, css: this.settings.css,
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
                    oldValue: this.currentValue || this.settings.defValue,
                    selector: this.settings.selector,
                    css: this.settings.css,
                };

                this.$store.dispatch('editor/setElemSettings', elemSettings);
            },
        },
        data: () => {
            return {
                v: '',
                selectedItem: '',
                active: 'tomato !important',
            };
        },
    }
</script>

<style lang="stylus" scoped>

    .input-group__input
        display: flex !important

    .radio-hidden
        opacity: 0

    .sample
        width: 65px
        height: 23px
        border: 1px solid #aaa
    .sample-square
        border-radius: 0
    .sample-circle
        border-radius: 10px
    .sample-ellipse
        border-radius: 5px
    .sample-inline
        border-bottom: none
        border-left: none
        border-right: none
        height: 1px
</style>
