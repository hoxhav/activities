import ApiService from './api.service'

class AuthenticationError extends Error {
    constructor(errorCode, message, errors = []) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;
        this.errors = errors;
    }
}

const UserService = {
    /**
     * Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
     **/
    async login(email, password) {
        const requestData = {
            method: 'post',
            url: "auth/login",
            data: {
                email: email,
                password: password
            }
        };

        try {
            const response = await ApiService.customRequest(requestData);

            let message = response.status === 200 ?  "User successfully authenticated." : response.statusText;


            return {
                status: response.status,
                message: message,
                user: response.data.data.user ?? null,
                activities: response.data.data.activities ?? null,
            }

        } catch (error) {

            let errorObject = {
                status: (error.response.status ? error.response.status : 400),
                data: error.response.data
            }

            throw new AuthenticationError(errorObject.status, errorObject.data)
        }
    },

    async register(newUser) {

        try {
            const response = await ApiService.post("auth/register", {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                password_confirmation: newUser.confirmed_password
            });

            if (response.status === 201) {

                return {
                    status: response.status,
                    message: response.data.message,
                }


            }
        }  catch (error) {

            let errorObject = {
                status: (error.response.status ? error.response.status : 422),
                message: error.response.data.message,
                errors: error.response.data.errors
            }
            throw new AuthenticationError(errorObject.status, errorObject.message, errorObject.errors)
        }
    },

    /**
     * Logout the current user by removing the token from storage.
     * Will also remove `Authorization Bearer <token>` header from future requests.
     * Also remove push notifications token from backend so you won't receive requests when logged out.
     **/
    async logout() {

        const response = await ApiService.post("user/logout");

    }
};

export default UserService

export {UserService, AuthenticationError}
