const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Menu = require('../models/menu');

//Method to save a menu
app.post('/menu', checkToken, (req, res) => {

    let body = req.body;

    let menu = new Menu({
        name: body.name,
        url: body.url,
        icon: body.icon,
        isAssignable: body.isAssignable
    })

    menu.save((err, menuDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        res.status(201).json({
            ok: true,
            menu: menuDB
        })
    })

})