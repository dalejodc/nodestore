const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User incorrect'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Incorrect Password'
                }
            });
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.TOKEN_SEED ,{expiresIn: process.env.TOKEN_EXPIRES_IN})

        res.json({
            ok: true,
            user: userDB,
            token: token
        })
    });
});


module.exports = app;