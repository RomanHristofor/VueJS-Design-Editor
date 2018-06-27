<template>
    <v-layout row justify-center
              ref="form" lazy-validation
    >
        <div
            @click="isOpen"
        >
            <slot name="textLink"></slot>
        </div>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Use Google's location service?</v-card-title>
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
            }),
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
                    debugger
                    // this.$router.push({ path: '/login' });
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
                this.$store.dispatch('editor/isDisabledBtn', 'clear');
                this.dialog = false;
                //TODO refactoring
                this.$route.name === 'home' ? this.$router.push({ path: '/site' }) : this.$router.push({ path: '/' });
            }
        },
        data() {
            return {
                dialog: false,
                isClear: true
            };
        },
    };
</script>
