<template>
    <v-app>
        <app-navigation-drawer />

<!--        <app-header :drawer.sync="drawer"/>-->
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>


<script>
import AppHeader from "./AppHeader";
import AppNavigationDrawer from "./AppNavigationDrawer";

export default {
    name: "MainLayout",
    components: {
        AppHeader,
        AppNavigationDrawer
    },

}
</script>

<style scoped>

</style>