'use strict';
const db = require('../lib/pg');

module.exports = {
    put: async (name) => {
        try {
            const statement = `
                INSERT INTO user_account
                    (name, email, password, role)

                VALUES
                    ($1, $2, $3, $4)
                ON CONFLICT (name) DO UPDATE
                SET
                    name = $1,
                    email = $2,
                    password = $3,
                    role = $4
                RETURNING id
            `

            return (await db.queryParam(statement, [name])).rows[0]
        } catch (err) {
            console.log("err: ", err)
            throw err
        }
    },
    store: async (email, password) => {
        try {
            const statement = `
                INSERT INTO user_account
                    (email, password) 
                VALUES
                    ($1, $2) 
                RETURNING 
                    id
            `
            const res = (await db.queryParam(statement, [email, password])).rows[0]
            return {
                id: res.id,
            }
        } catch (err) {
            throw err
        }
    },
    getById: async (id) => {
        try {
            const statement = `
                SELECT 
                    *
                FROM
                    user_account
                WHERE 
                    id = $1 
            `
            return (await db.queryParam(statement, [id])).rows[0]
        } catch (err) {
            throw err
        }
    },
    getByEmail: async (email) => {
        try {
            const statement = `
            SELECT 
                *
            FROM
                user_account
            WHERE 
                email = $1 
        `
            return (await db.queryParam(statement, [email])).rows[0]
        } catch (err) {
            throw err
        }
    },

    getByName: async (name) => {
        try {
            console.log("name: ", name)
            const statement = `
            SELECT 
                *
            FROM 
                user_account
            WHERE 
                name % $1
        `
            return (await db.queryParam(statement, [`%${name}%`])).rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    getAll: async () => {
        try {
            const statement = `
                SELECT
                    *
                FROM
                    user_account
             `
            return (await db.queryParam(statement, [])).rows
        } catch (err) {
            throw err
        }
    },
    
    
}


