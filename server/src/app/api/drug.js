"use strict";
const { getByName, getAll } = require('../db/drug');
const drugService = require('../service/drug');
const middleware = require('../utils/middleware')

const drugRouter = require('express').Router();

drugRouter.put('/', async (req, res, next) => {
    try {
        const { name } = req.body
        res.send(await drugService.put(name))
    } catch (err) {
        res.status(401).send(err)
    }
});

drugRouter.get('/', async (req, res, next) => {
    try {
        const { name } = req.query
        if (name) {
            res.send(await drugService.getByName(name))
        } else {
            res.send(await drugService.getAll())
        }
    } catch (err) {
        res.status(401).send(err)
    }
})

drugRouter.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        res.send(await drugService.getById(id))

    } catch (err) {
        res.status(401).send(err)
    }
})



module.exports = drugRouter;