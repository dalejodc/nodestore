const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Menu = require('../models/menu');

//Method to save a menu
app.post('/menu', checkToken, (req, res) => {

    let body = req.body;

    let men = new Menu({
        name: body.name,
        description: body.description,
        url: body.url,
        icon: body.icon,
        isAssignable: body.isAssignable
    })

    men.save((err, menuDB) => {

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


// Method to get all the enabled menus
app.get('/menus', checkToken, (req, res) => {

    Menu.find()
        .sort('name')
        .exec((err, menusDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                menus: menusDB
            });

        });
})


module.exports = app;