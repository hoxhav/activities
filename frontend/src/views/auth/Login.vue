<template>

    <v-container class="fill-height" fluid>

        <v-row justify="center">

            <v-col cols="12" sm="8" md="4">

                <v-card class="elevation-12">

                    <v-toolbar color="primary" dark flat>

                        <v-toolbar-title>Login in your account</v-toolbar-title>

                    </v-toolbar>

                    <v-card-text>

                        <v-form ref="login">

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

                        </v-form>

                        <h3>Need an account? <a @click="register">Register here</a></h3>

                    </v-card-text>

                    <v-card-actions>

                        <v-spacer></v-spacer>

                        <v-btn tile color="primary" @click="handleLogin">Login</v-btn>

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

            errorMessage: '',

            password: '',

        }

    },

    methods: {

        async handleLogin () {
            if (!this.$refs.login.validate()) return;

            let response = await this.$root.$store.dispatch('auth/login', {email: this.email.toLowerCase(), password: this.password});

            let message = this.$root.$store.getters['auth/authenticationMessage'];
            let status = this.$root.$store.getters['auth/authenticationStatus'];
            let activities = this.$root.$store.getters['auth/activities'];

            console.log(message);
            console.log(status);
            console.log(activities);


        },

        register: function () {
            this.$router.push("/register");
        }

    }
}
</script>

<style scoped>

</style>