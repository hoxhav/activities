<template>

    <v-app>

        <app-navigation-drawer :drawer.sync="drawer" />

        <app-header :drawer.sync="drawer"/>

        <v-main>

            <v-container fluid>

                <router-view></router-view>

            </v-container>

        </v-main>

    </v-app>

</template>


<script>

export default {
    name: "MainLayout",

    components: {
        AppHeader: () => import('./AppHeader'),
        AppNavigationDrawer: () => import('./AppNavigationDrawer')
    },

    data() {
        return {
            drawer: true,
        }
    }

}
</script>

<style scoped>

</style>