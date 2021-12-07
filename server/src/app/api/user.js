"use strict";
var userService = require('../service/user')
const middleware = require('../utils/middleware')

const userRouter = require('express').Router();


userRouter.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userId = await userService.register(email, password)
        res.send("success")
    } catch (err) {
        res.status(401).send(err)
    }
});

userRouter.post('/verify', middleware.jwtDecode, async (req, res, next) => {
    try {
        const userData = req.userData

        res.send({ userData })
    } catch (err) {
        res.status(200).send({ msg: "Expired" })
    }
});


userRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (email == undefined) {
            throw "Email Missing"
        }
        if (password == undefined) {
            throw "Password Missing"
        }
        const token = await userService.login(email, password)

        //set token
        res.cookie('token', token, { maxAge: 900000, secure: true, sameSite: 'none', httpOnly: true });
        res.send({
            token
        })

    } catch (err) {
        res.status(401).send(err)
    }
})

userRouter.put('/', async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        res.send(await userService.put(name))
    } catch (err) {
        res.status(401).send(err)
    }
})

userRouter.get('/', async (req, res, next) => {
    try {
        const { name } = req.query
        if (name) {
            res.send(await userService.getByName(name))
        } else {
            res.send(await userService.getAll())
        }
    } catch (err) {
        res.status(401).send(err)
    }
})

userRouter.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        res.send(await userService.getById(id))

    } catch (err) {
        res.status(401).send(err)
    }
})



module.exports = userRouter;