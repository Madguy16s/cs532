'use strict';
const db = require('../lib/pg');

module.exports = {
    put: async (name) => {
        try {
            const statement = `
                INSERT INTO prescription
                    (patient_id, doctor_id, pharmacist_id, drug_data, drug_id)
                VALUES
                    ($1, $2, $3)
                ON CONFLICT (name) DO UPDATE
                SET
                    patient_id = $1,
                    doctor_id = $2,
                    pharmacist_id = $3,
                    drug_data = $4,
                    drug_id = $5
                RETURNING id
            `

            return (await db.queryParam(statement, [patientId, doctorId, pharmacistId, drugData, drugId])).rows[0]
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
                    prescription
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
                prescription
            WHERE 
                id = $1
        `
            return (await db.queryParam(statement, [id])).rows[0]
        } catch (err) {
            console.log(err)
            throw err
        }
    },
  
}