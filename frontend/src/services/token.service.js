const TOKEN_KEY = 'access_token';

/**
 * Manage the how Access Tokens are being stored and retrieved from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
 **/
const TokenService = {
    async getToken() {
        return new Promise((resolve) => {
            resolve(localStorage.getItem(TOKEN_KEY));
        });
    },

    saveToken(accessToken) {
        return new Promise((resolve) => {
            resolve(localStorage.setItem(TOKEN_KEY, accessToken));
        });
    },

    removeToken() {
        return new Promise((resolve) => {
            resolve(localStorage.removeItem(TOKEN_KEY));
        });
    }
};

export default TokenService;
