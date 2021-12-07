// in src/authProvider.js

import { SERVER_URL } from './util/CONSTANTS';


const authProvider = {
    login: async ({ username: email, password }) => {
        const request = new Request(`${SERVER_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request)
            if (response.status < 200 || response.status >= 300) {
                throw new Error(await response.text());
            }
            const { token: {
                adminAccess,
                jwt
            } } = await response.json()
            console.log('adminAccess: ', adminAccess)
            if (adminAccess != 'ADMIN') {
                throw new Error('INVALID PERMISSION')
            }
            await localStorage.setItem('token', jwt);
        } catch (err) {
            throw err
        }


    },
    checkError: (error) => {
        const status = error.status;
        if (status != 200) {
            localStorage.removeItem('token');
            return Promise.reject({ message: false });
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: async () => {
        try {
            console.log("checkAuth")
            if (!(await localStorage.getItem('token'))) {
                throw "Token null"
            }
        } catch (err) {
            return Promise.reject();
        }
    },
    getPermissions: params => Promise.resolve(),
    logout: async () => {
        await localStorage.removeItem('auth');
        return Promise.resolve();
    }
};

export default authProvider;