'use strict';
const prescription = require('../db/prescription');
var prescriptionDB = require('../db/prescription')

module.exports = {
    put: async (name) => {
        return await prescriptionDB.put(name)
    },
    getAll: async () => {
        return await prescriptionDB.getAll();
    },
    getById: async (id) => {
        return await prescriptionDB.getById(id);
    }
}