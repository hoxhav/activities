<template>


    <v-snackbar bottom :color="color" v-model="snackbar" :timeout="timeout">

        <template v-if="typeof snackbar_content == 'object' ">

            <v-container grid-list-sm style="padding:0px;">

                <v-row>

                    <v-col cols="12" v-for="(item, index) in snackbar_content" :key="index">

                        <ul style="list-style-type: none;">

                            <li v-for="(snack_item, j) in item" :key="j">

                                <span v-show="typeof index == 'string'"><b> {{ index }}</b> :</span> {{ snack_item }}

                            </li>

                        </ul>

                    </v-col>

                </v-row>

            </v-container>

        </template>

        <template v-else>

            {{ snackbar_content }}

        </template>
        <template v-slot:action="{ attrs }">
            <v-btn dark text @click.native="snackbar = false" v-bind="attrs">Close</v-btn>
        </template>
    </v-snackbar>


</template>

<script>

export default {

    data() {

        return {

            color: '',

            auto_heigth: true,

            snackbar: false,

            snackbar_content: '',

            timeout: 5000,
        }

    },

    computed: {

        status: function () {
            return this.$store.getters['utils/getStatus'];
        },

    },

    /**
     *
     */
    watch: {


        status: function () {
            if(this.status > 0) {

                this.showAlert();

            }
        },


    },

    /**
     *
     */
    methods:
        {
            /**
             *
             */
            showAlert: function () {


                if (this.status >= 200 && this.status < 300) {

                    this.color = 'success';

                } else if(this.status >= 400) {

                    this.color = 'error';

                }

                this.snackbar_content =  this.$store.getters['utils/getMessage'];

                this.snackbar = true;

                if (this.snackbar == true) setTimeout(this.reset, 2000);

            },

            /**
             *
             */
            reset: function () {
                this.snackbar = false;
                this.$store.commit('utils/resetNotifications')
            }

        }
}
</script>
