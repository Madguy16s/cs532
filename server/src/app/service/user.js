'use strict';
const { OAuth2Client } = require('google-auth-library')
var userDB = require('../db/user')
var bcrypt = require('bcryptjs');
var jwt = require('../utils/jwt');
const { getByEmail } = require('../db/user');

const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = {

    /**
     * Function which will register a new user, given the correct credentials
     * @param  {string} email
     * @param  {string} password
     * @returns id
     */
    register: async (email, password) => {
        try {
            if (!validateEmail(email)) {
                throw 'Invalid email address'
            }
            const user = await userDB.getByEmail(email)
            if (user != null) {
                throw 'The email has already been used'
            }
            const res = await userDB.store(email, bcrypt.hashSync(password, 10))
            return res.id
        } catch (err) {
            throw err
        }
    },

    put: async(name, email, password, role) => {
        return await userDB.put(name, email, bcrypt.hashSync(password, 10), role)
    },

    /**
     * Function which will login a user, given the appropriate credentials
     * @param  {string} email
     * @param  {string} password
     * @returns Access Token
     */
    login: async (email, password) => {
        try {
            const user = await userDB.getByEmail(email)
            if (user == null) {
                throw "Email not found"
            }
            if (bcrypt.compareSync(password, user.password)) {
                return {
                    adminAccess: user.adminAccess,
                    jwt: jwt.generateAccessToken({
                        id: user.id,
                        email: user.email,
                        adminAccess: user.adminAccess
                    })
                }
            } else {
                throw "Wrong password"
            }
        } catch (err) {
            throw err
        }
    },

    getUserByUserId: async (id) => {
        try {
            return await getById(id)
        } catch (err) {
            return null
        } 
    },

    getByName: async (name) => {
        return await userDB.getByName(name);
    },

    getAll: async () => {
        return await userDB.getAll();
    },

}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}