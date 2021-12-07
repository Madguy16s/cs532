"use strict";
const { getByName, getAll } = require('../db/lab');
const labService = require('../service/lab');
const middleware = require('../utils/middleware')

const labRouter = require('express').Router();

labRouter.put('/', async (req, res, next) => {
    try {
        const { name } = req.body
        res.send(await labService .put(name))
    } catch (err) {
        res.status(401).send(err)
    }
});


labRouter.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        res.send(await labService .getById(id))

    } catch (err) {
        res.status(401).send(err)
    }
})

labRouter.get('/', async (req, res, next) => {
    try {
        res.send(await labService .getAll())

    } catch (err) {
        res.status(401).send(err)
    }
})



module.exports = labRouter;