import ApiService from './api.service'
import TokenService from './token.service'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;
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

            if (response.status === 200) {
                await TokenService.saveToken(response.data.access_token);
                await ApiService.setHeader();
                return {
                    status: response.status,
                    activities: response.data.user,
                    message: response.statusText,
                    token: response.data.access_token
                }
            } else {
                return {
                    status: response.status,
                    message: response.statusText
                }
            }
        } catch (error) {

            if (error.message === 'Network Error') {
                throw new AuthenticationError(503, {type: 'NetworkError'})
            } else {
                let errorObject = {
                    status: (error.response.status ? error.response.status : 400),
                    data: error.response.data
                }
                throw new AuthenticationError(errorObject.status, errorObject.data)
            }
        }
    },

    /**
     * Logout the current user by removing the token from storage.
     * Will also remove `Authorization Bearer <token>` header from future requests.
     * Also remove push notifications token from backend so you won't receive requests when logged out.
     **/
    async logout() {
        try {
            await TokenService.removeToken();
            ApiService.removeHeader();
        } catch (err) {
            console.log(err);
        }
    }
};

export default UserService

export {UserService, AuthenticationError}
