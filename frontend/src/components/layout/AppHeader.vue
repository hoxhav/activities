<template>
    <v-app-bar color="primary" dense clipped-left app>
        <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer" color="white"/>
        <v-toolbar-title style="color: white;">{{ 'Activities' }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="white" dark elevation="0" v-bind="attrs" v-on="on" fab small>
                    <v-icon color="primary">mdi-account</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="$store.dispatch('auth/logout')" dense>
                    <v-list-item-icon>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    name: "AppHeader",

    props: {
        drawer: Boolean
    },

    computed: {

        showDrawer: {
            get: function () {
                return this.drawer
            },
            set: function (v) {
                this.$emit('update:drawer', v)
            }
        }
    },

}
</script>

<style scoped>

</style>