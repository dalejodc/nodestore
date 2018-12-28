const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const User = require('../models/user')

app.post('/login', (req, res)=>{

    res.json({
        ok: true
    })
});


module.exports = app;