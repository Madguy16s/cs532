'use strict';
const db = require('../lib/pg');

module.exports = {
    put: async (name) => {
        try {
            const statement = `
                INSERT INTO drug
                    (name)
                VALUES
                    ($1)
                ON CONFLICT (name) DO UPDATE
                SET
                    name = $1
                RETURNING id
            `

            return (await db.queryParam(statement, [name])).rows[0]
        } catch (err) {
            console.log("err: ", err)
            throw err
        }
    },
    getAll: async () => {
        try {
            const statement = `
                SELECT
                    *
                FROM
                    drug
             `
            return (await db.queryParam(statement, [])).rows
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
                drug
            WHERE 
                id = $1
        `
            return (await db.queryParam(statement, [id])).rows[0]
        } catch (err) {
            console.log(err)
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
                drug
            WHERE 
                name % $1
        `
            return (await db.queryParam(statement, [`%${name}%`])).rows
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}