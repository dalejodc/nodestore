const express = require('express')
const app = express()

const User = require('../models/user')

app.get('/user', (req, res) => {
    res.json('GET user')
})

app.post('/user', (req, res) => {
    
    let body = req.body;

    let user = new User({
        name:  body.name,
        email: body.email,
        password: body.password,
        role: body.role,
        status: true
    })

    res.json('POST user')
})

app.put('/user/:id', (req, res) => {

    let id = req.params.id;

    res.json({id})
})

app.delete('/user', (req, res) => {
    res.json('DELETE user')
})

module.exports = app;