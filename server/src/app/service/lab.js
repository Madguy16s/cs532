'use strict';
const lab = require('../db/lab');
var labDB = require('../db/lab')

module.exports = {
    put: async (name) => {
        return await labDB.put(name)
    },
    getAll: async () => {
        return await labDB.getAll();
    },
   
    getById: async (id) => {
        return await labDB.getById(id);
    }
}