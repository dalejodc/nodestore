const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Role = require('../models/role');

//Method to save a Role
app.post('/role', checkToken, (req, res) => {

    let body = req.body;

    let role = new Role({
        name: body.name,
        description: body.description,
        menus: body.menus,
        state: body.state
    })

    role.save((err, roleDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        res.status(201).json({
            ok: true,
            role: roleDB
        })
    })

})

// Method to get all the enabled roles
app.get('/roles', checkToken, (req, res) => {

    Role.find({state: true}, "name menus")
        .sort('name')
        .exec((err, rolesDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                roles: rolesDB
            });

        });
})

module.exports = app;