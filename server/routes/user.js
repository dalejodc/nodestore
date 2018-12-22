const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user')

app.get('/users', (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 5;
    to = Number(to);

    User.find({}, 'name email')
        .skip(from)
        .limit(to)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            User.count({}, (err, count) => {
                res.json({
                    ok: true,
                    //count: count,
                    users: users
                });
            })
        });
})

app.post('/user', (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
})

app.put('/user/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'image', 'role', 'status']); //To select just the properties to update

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, user) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            user: user
        });

    });

})

app.delete('/user', (req, res) => {
    res.json('DELETE user')
})

module.exports = app;