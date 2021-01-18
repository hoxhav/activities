<template>

    <v-container>

        <v-row>

            <v-col class="pa-0 pa-md-4" cols="12">

                <div v-if="activities.length == 0">You don't have any activities</div>

                <v-btn
                    tile
                    color="success"
                    depressed
                    :disabled="selected_activity == null "
                    v-if="activities.length > 0"
                    @click="show_activity_completition = true"
                >
                    <v-icon left>mdi-trash-can</v-icon>

                    Completed

                </v-btn>

                <v-card class="mt-4">

                    <v-list-item-group
                        v-model="selected_activity"
                        single
                        active-class=""
                    >

                    <v-list-item v-for="activity in activities" v-bind:key="activity.id" :value="activity.id" tile three-line>

                        <template v-slot:default="{ active }">

                            <v-list-item-action>

                                <v-checkbox
                                    :input-value="active"

                                    color="primary"

                                ></v-checkbox>

                            </v-list-item-action>


                            <v-list-item-content>

                                <v-list-item-title>{{activity.name}}</v-list-item-title>

                                <v-list-item-subtitle>{{activity.description}}</v-list-item-subtitle>

                            </v-list-item-content>

                        </template>

                    </v-list-item>

                    </v-list-item-group>

                </v-card>


            </v-col>

        </v-row>

        <v-dialog v-model="show_activity_completition" max-width="500px">

            <v-card>

                <v-card-title>

                    <span class="title">Are you sure you want to complete this activity? </span>

                </v-card-title>

                <v-card-actions>

                    <v-spacer></v-spacer>

                    <v-btn text @click="show_activity_completition = false"> Cancel </v-btn>

                    <v-btn text @click="changeActivityStatus" > Confirm </v-btn>

                </v-card-actions>

            </v-card>

        </v-dialog>

    </v-container>

</template>

<script>

export default {

    name: "Activity",

    data() {

        return {

            selected_activity: null,

            show_activity_completition: false,
        }
    },

    computed: {

        activities: function () {

            return this.$store.getters['activities/getActivities'];

        },

    },

    methods: {

        changeActivityStatus: async function () {

            let response = await this.$root.$store.dispatch('activities/completeActivity', {activity_id: this.selected_activity});

            this.show_activity_completition = false;

            if (response == 200) {

                this.$store.commit("utils/setStatus", response);

                this.$store.commit("utils/setMessage", "Activity succesfully completed.");

            }

        }

    }
}
</script>

<style scoped>

</style>