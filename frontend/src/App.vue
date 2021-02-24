<template>

    <v-app>

        <app-notifications ref="notifications"/>

        <router-view></router-view>

        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="primary accent-4"
            height="8"
        ></v-progress-linear>

    </v-app>

</template>

<script>

export default {
    name: 'App',
    
    computed: {

        loading: function () {

            return this.$store.getters['utils/getLoadingBarStatus'];

        },

    },
};

</script>
