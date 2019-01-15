const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Category = require('../models/category')

app.post('/category', checkToken, (req, res)=>{
    let body = req.body;
    
    let category = new Category({
        description: body.description,
        user: req.user._id
    })

    category.save((err, categoryDB)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                err: err
            })
        }

        if(!categoryDB){
            return res.status(400).json({
                ok:false,
                err: err
            })
        }

        res.json({
            ok:true,
            category: categoryDB
        })
    })
});

module.exports = app;