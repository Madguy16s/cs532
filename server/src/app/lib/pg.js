require('dotenv').config({ path: './.env' });
const { createDb, migrate } = require("postgres-migrations")
const { Pool } = require('pg')
const { camelCase } = require('lodash')

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})


module.exports = {
  query: async (statement, camelCase = true) => {
    let res = await pool.query(statement)
    if (camelCase) {
      res.rows = toCamel(res.rows)
    }
    return res
  },
  queryParam: async (statement, param, camelCase = true) => {
    let res = await pool.query(statement, param)
    if (camelCase) {
      res.rows = toCamel(res.rows)
    }
    return res
  },
  getClient: async () => {
    return await pool.connect()
  },
  migrate: async () => {
    try {
      const client = await pool.connect()
      await migrate({ client }, `${process.cwd()}/migrations`)
      await client.end()
      console.log("DB successfully migrated!!!")
      return 'Database Migrated'
    } catch (err) {
      console.log("DB migration FAILED!!!")
      console.log("=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/")
      console.log(err)
      console.log("=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/")
      return 'Database Migration FAILED'
    }
  },
  transaction: async (routine) => {
    try {
      const client = await pool.connect()
      const queryParamT = async (statement, param) => {
        let res = await pool.query(statement, param)
        res.rows = toCamel(res.rows)
        return res
      }
      const queryT = async statement => {
        let res = await pool.query(statement)
        res.rows = toCamel(res.rows)
        return res
      }
      try {
        await client.query('BEGIN')
        const res = await routine(queryParamT, queryT)
        await client.query('COMMIT')
        return res
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release()
      }
    } catch (err) {
      throw err
    }
  }
}

const toCamel = o => {
  var newO, origKey, value
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[camelCase(origKey)] = value
      }
    }
  }
  return newO
}
