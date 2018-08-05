<template>
    <v-layout row justify-center
              ref="form" lazy-validation
              :open="eventOpenDialog ? isOpen() : ''"
    >
        <div
            @click="isOpen"
        >
            <slot name="textLink"></slot>
        </div>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">
                    “First, solve the problem. Then, write the code.”
                    —John Johnson
                </v-card-title>
                <v-card-text>
                    У вас есть несохраненные изменения. Хотите их сохранить?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1"
                           flat="flat"
                           :disabled="isClear"
                           @click="saveChanges">Да</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="resetChanges">Нет</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'ModalGoTo',
        computed: {
            ...mapGetters('editor', {
                data: 'getElemSettings',
                elemLength: 'getElemSettingsLength',
                isOpenSearch: 'getOpenSearchStatus',
            }),
        },
        props: {
            link: {
                type: Object,
            },
            eventOpenDialog: {
                type: String,
            }
        },
        methods: {
            isOpen() {
                if ( this.elemLength > 0 ) {
                    this.dialog = true;
                }
            },
            saveChanges() {
                debugger
                if (this.$refs.form.validate()) {
                    this.$http
                        .post('/design_editor', {
                            data: this.data,
                            type: 'dispatcher',
                        })
                        .then( ({ data }) => {
                                if (data.errors === false) {
                                    this.clear();
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
                }
            },
            resetChanges() {
                this.$store.dispatch('editor/clearChangesElemSettings', {modal: 'clear'});
                this.dialog = false;

                if ( this.link.path === 'search' ) {
                    this.$store.dispatch('editor/setOpenCloseSearch');
                    window.frames.vigbo.postMessage(this.isOpenSearch, '*');
                }
                this.$router.push({path: '/'});
            }
        },
        data() {
            return {
                dialog: false,
                isClear: true,
            };
        },
    };
</script>
