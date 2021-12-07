"use strict";
const { getByName, getAll } = require('../db/prescription');
const prescriptionService = require('../service/prescription');
const middleware = require('../utils/middleware')

const prescriptionRouter = require('express').Router();

prescriptionRouter.put('/', async (req, res, next) => {
    try {
        const { name } = req.body
        res.send(await prescriptionService .put(name))
    } catch (err) {
        res.status(401).send(err)
    }
});


prescriptionRouter.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        res.send(await prescriptionService .getById(id))

    } catch (err) {
        res.status(401).send(err)
    }
})
prescriptionRouter.get('/', async (req, res, next) => {
    try {
        res.send(await prescriptionService .getAll())

    } catch (err) {
        res.status(401).send(err)
    }
})



module.exports = prescriptionRouter;