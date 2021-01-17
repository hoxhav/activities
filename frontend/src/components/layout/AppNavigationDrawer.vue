<template>
        <v-navigation-drawer
            app
            clipped
            v-model="showDrawer"
        >
            <v-list>

                <v-list-item link>
                    <v-list-item-avatar>
                        <v-avatar color="primary">
                            <span class="white--text headline">{{initials}}</span>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>


                        <v-list-item-title class="title">
                            {{fullName}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list
                nav
                dense
            >
                <v-list-item :to="'/activities'">
                    <v-list-item-icon>
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Activities</v-list-item-title>
                </v-list-item>
                <v-list-item :to="'/help'">
                    <v-list-item-icon>
                        <v-icon>mdi-information</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Help</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
</template>

<script>
export default {
    name: "AppNavigationDrawer",

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
        },

        initials: function () {
            let name = this.fullName.split(" ");
            let initials = "";

            //has first and last name
            if(name.length > 1) {
                initials = name[0].charAt(0) + name[1].charAt(0);
            } else {
                initials = name[0].charAt(0) + name[0].charAt(1);
            }

            return initials;
        },
    },

    data() {
        return {

            fullName: this.$store.getters['user/getName'],

            email: this.$store.getters['user/getEmail']

        }
    }
}
</script>

<style scoped>

</style>