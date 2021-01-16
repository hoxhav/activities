<template>


    <v-snackbar top :color="color" v-model="snackbar" :timeout="timeout">

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

            timeout: 5000

        }

    },

    computed: {
        errors()  {
            return this.$store.getters['utils/getErrors']
        },



        status(){ return this.$store.getters['utils/getStatus']} ,

        warning(){return this.$store.getters['utils/getWarning']} ,

        success(){return this.$store.getters['utils/getSuccess']}  ,
    },

    /**
     *
     */
    watch: {

        // /**
        //  *  status
        //  */
        status: function () {

            this.showAlert();

        },
        //
        // /**
        //  *
        //  */
        errors: function () {

            this.showAlert();

        },
        //
        // /**
        //  *
        //  */
        // warning: function () {
        //     this.warning = this.$root.warning;
        //
        //     this.showAlert();
        //
        // },
        //
        // /**
        //  *
        //  */
        // success: function (newVal, oldVal) {
        //
        //     this.success = this.$root.success;
        //
        //     this.showAlert();
        //
        // }

    },

    created() {

    },

    /**
     *
     */
    mounted() {

        this.showAlert();

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
                let snackbar = false;

                /**
                 *
                 */
                if (this.status.length > 0) {
                    this.snackbar_content = this.status;
                    this.color = 'info';
                    snackbar = true;
                }

                /**
                 *
                 */
                if (this.warning.length > 0) {
                    this.snackbar_content = this.warning;
                    this.color = 'warning';
                    snackbar = true;
                }

                /**
                 *
                 */
                if (typeof this.errors.length == 'undefined') {

                    this.snackbar_content = this.errors;
                    this.color = 'error';
                    snackbar = true;

                } else if (this.errors.length > 0) {

                    this.snackbar_content = this.errors;
                    snackbar = true;
                    this.color = 'error';

                }

                /**
                 *
                 */
                if (this.success.length > 0) {
                    this.snackbar_content = this.success;
                    this.color = 'success';
                    snackbar = true;
                }

                this.snackbar = snackbar;

                /**
                 *
                 */
           //     if (this.snackbar == true) setTimeout(this.reset, 2000);

            },

            /**
             *
             */
            reset: function () {
             //   this.$root.resetNotifications();
            }

        }
}
</script>
