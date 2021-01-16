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

            errorMessage: '',

            password: '',

            confirmed_password: '',

            confirmPasswordRules: [
                (value) =>
                    value === this.password || 'The password confirmation does not match.',
            ],
        }

    },

    methods: {

        handleRegister: function () {
            if (!this.$refs.register.validate()) return;

        },

        login: function () {
            this.$router.push("/");
        }

    },
}
</script>

<style scoped>

</style>