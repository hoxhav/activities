/**
 *
 * AXIOS WRAPPER
 *
 */
export default {

    /**
     *
     */
    data () {

        return {}

    },

    methods: {

        /**
         *
         * @param {string} method
         * @param {string} url
         * @param {FormData} data
         * @param {Function} callback
         * @param  {...any} args
         */
        call: function( method, url, data = new FormData(), callback, ...args)
        {

            let options = {

                method : method,
                url    : url,
                data   : data

            }

            /**
             * split ..args into standards and args with functions
             */
            let standard_arguments = [];

            let function_arguments = [];

            args.forEach(element => {

                if(typeof element == "function")
                {
                    function_arguments.push(element);

                } else {

                    standard_arguments.push(element);
                }

            });


            axios(options)

                .then(function (response) {

                    callback(response, ...standard_arguments);

                }).catch( e => {

                /**
                 * if there are function in arguments execute it
                 * instead of executing default error handling
                 */
                if(function_arguments.length > 0)
                {
                    function_arguments.forEach(element => {

                        element(e);

                    });

                }else{

                    this.handleError(e);

                }

            });

        },

        /**
         *
         * @param {String} url
         * @param {Function} callback
         * @param  {...any} args
         */
        get: function( url, callback, ...args)
        {
            this.call('get', url, null, callback, ...args);
        },

        /**
         *
         * @param {String} url
         * @param {Form} form
         * @param {Function} callback
         * @param  {...any} args
         */
        post: function(url, form = new FormData(), callback, ...args ) {

            this.call('post', url, form, callback, ...args);

        },

        /**
         *
         * @param {String} url
         * @param {Function} callback
         * @param  {...any} args
         */
        delete: function(url, callback, ...args)
        {
            this.call('delete', url, [], callback, ...args);

        },

        /**
         *
         * @param {String} url
         * @param {FormData} form
         * @param {Function} callback
         * @param  {...any} args
         */
        patch: function(url, form = new FormData(), callback, ...args ) {

            this.call('patch', url, form, callback, ...args);

        },

        /**
         *
         * @param {Error} error
         */
        handleError: function(error)
        {

            console.log(error);

            let message = error.response.statusText;

            let status  = error.response.status;

            if(error.response.data.hasOwnProperty('message'))
            {
                message = error.response.data.message;
            }

            this.$root.errors = { 'oops' : [ message ]  };

            this.handleErrorStatusCode(status);
        },

        /**
         *
         * @param {int} code
         */
        handleErrorStatusCode: function(code)
        {
            let redirect = true;
            let timeout  = 5000;

            switch(code){

                case 401:
                case 404:
                case 403:
                case 419:
                    break;
                case 422:
                    redirect = false;
                    break;
            }

            if(redirect)
            {
                //setTimeout(function(){ window.document.location.href = process.env.MIX_APP_REDIRECT_URL_HOME; }, timeout);
            }

        }

    }

}
