<template>
    <v-container >

        <v-form ref="activity">

            <v-row>

                <v-col class="pa-0 pa-md-4" cols="12" md="5" lg="4">

                    <v-text-field
                        v-model="name"
                        solo
                        label="Activity name"
                        clearable
                        :rules="$root.rules.required"
                    ></v-text-field>

                </v-col>

                <v-col class="pa-0 pa-md-4" cols="12" md="6" lg="7">

                    <v-text-field
                        v-model="description"
                        solo
                        label="Description"
                        clearable
                    ></v-text-field>

                </v-col>

                <v-col class="pa-0 pa-md-6 "cols="12" md="1" lg="1">

                    <v-tooltip bottom>

                        <template v-slot:activator="{ on, attrs }">

                            <v-btn
                                @click="addActivity"
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >

                                <v-icon>mdi-plus</v-icon>

                            </v-btn>

                        </template>

                        <span>Add activity</span>

                    </v-tooltip>

                </v-col>

            </v-row>

        </v-form>

    </v-container>

</template>

<script>

export default {

    name: "AddActivity",

    data() {

        return {


            name: '',

            description: ''


        }

    },

    methods: {

        addActivity: async function () {

            if (!this.$refs.activity.validate()) return;


            let response = await this.$root.$store.dispatch('activities/addActivity', {name: this.name, description: this.description});

            if (response == 201) {

                this.$store.commit("utils/setStatus", response);

                this.$store.commit("utils/setMessage", "Activity succesfully added.");

                this.$refs.activity.reset();

            }

        }
    }
}
</script>

<style scoped>

</style>