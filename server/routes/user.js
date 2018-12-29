const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user')
const checkToken = require('../middlewares/authentication').checkToken;

// Method to get all the enabled users
app.get('/users', checkToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 20;
    to = Number(to);

    User.find({state: true}, 'name email state')
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

//Method to save an user
app.post('/user', checkToken, (req, res) => {

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

//Method to update an user
app.put('/user/:id', checkToken, (req, res) => {

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

//To delete the user
app.delete('/user/:id', (req, res) => {
    
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, del)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        if(!del){
            return res.status(400).json({
                ok: false,
                err: "User doesn't exist"
            })
        }

        res.json({
            ok: true,
            user: del
        })
    });
})

//To disable the user changing the state to false
app.post('/user/disable/:id', (req, res)=>{

    let id = req.params.id;

    let changeStatus = {
        state: false
    };
    
    User.findByIdAndUpdate(id, changeStatus, (err, disabled) =>{
       
        if(err){
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            user: disabled
        });

    });
});

// Method to get all the disables users
app.get('/users/disables', (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 20;
    to = Number(to);

    User.find({state: false}, 'name email state')
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

module.exports = app;