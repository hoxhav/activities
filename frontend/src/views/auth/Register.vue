<template>

    <v-container class="fill-height" fluid>

        <v-row justify="center">

            <v-col cols="12" sm="8" md="4">

                <v-card class="elevation-12">

                    <v-toolbar color="primary" dark flat>

                        <v-toolbar-title>Register in our app</v-toolbar-title>

                    </v-toolbar>

                    <v-card-text>

                        <v-form ref="register">

                            <v-text-field
                                label="Name"
                                prepend-icon="mdi-account"
                                type="text"
                                v-model="name"
                                :rules="$root.rules.required"
                            />

                            <v-text-field
                                label="Email"
                                prepend-icon="mdi-email"
                                type="text"
                                v-model="email"
                                :rules="$root.rules.email"
                            />

                            <v-text-field
                                label="Password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="password"
                                :rules="$root.rules.password"
                            />


                            <v-text-field
                                label="Repeat password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="confirmed_password"
                                :rules="confirmPasswordRules"
                            />


                        </v-form>

                        <h3>Already own an account? <a @click="login">Login here</a></h3>

                        <div style="color: red" v-if="detailErrorMessages.length > 0">{{detailErrorMessages}}</div>
                    </v-card-text>

                    <v-card-actions>

                        <v-spacer></v-spacer>

                        <v-btn tile color="primary" @click="handleRegister">Register</v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>

export default {
    name: "Login",

    data() {

        return {

            email: '',

            name: '',

            detailErrorMessages: '',

            password: '',

            confirmed_password: '',

            confirmPasswordRules: [
                (value) =>
                    value === this.password || 'The password confirmation does not match.',
            ],
        }

    },

    methods: {

        handleRegister: async function () {
            if (!this.$refs.register.validate()) return;

            let newUser = {
                name: this.name,
                email: this.email.toLowerCase(),
                password: this.password,
                confirmed_password: this.confirmed_password
            }

            let response = await this.$root.$store.dispatch('auth/register', {newUser});

            let message = this.$root.$store.getters['auth/authenticationMessage'];
            let status = this.$root.$store.getters['auth/authenticationStatus'];

            this.$store.commit("utils/setStatus", status);
            this.$store.commit("utils/setMessage", message);

            if(status != 201) {

                let errors = this.$root.$store.getters['auth/registrationFormErrors'];

                for (let key of Object.keys(errors)) {
                    this.detailErrorMessages += errors[key][0];
                }

            } else {
                this.detailErrorMessages = '';

                this.login();
            }


        },

        login: function () {
            this.$router.push("/");
        }

    },
}
</script>

<style scoped>

</style>