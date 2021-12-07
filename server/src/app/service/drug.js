'use strict';
const drug = require('../db/drug');
var drugDB = require('../db/drug')

module.exports = {
    put: async (name) => {
        return await drugDB.put(name)
    },
    getAll: async () => {
        return await drugDB.getAll();
    },
    getByName: async (name) => {
        return await drugDB.getByName(name);
    },
    getById: async (id) => {
        return await drugDB.getById(id);
    }
}