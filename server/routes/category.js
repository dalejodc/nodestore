const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Category = require('../models/category')

// Method to get all the enabled categories
app.get('/categories', checkToken, (req, res) => {

    Category.find({state: true})
        .exec((err, categoriesDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }


            res.json({
                ok: true,
                categories: categoriesDB
            });

        });
})

//Method to create a category
app.post('/category', checkToken, (req, res) => {
    let body = req.body;

    let category = new Category({
        description: body.description,
        user: req.user._id
    })

    category.save((err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            category: categoryDB
        })
    })
});

//Method to update a category
app.put('/category/:id', checkToken, (req, res) => {

    let id = req.params.id;
    let body = req.body

    let category = {
        description: body.description
    };

    Category.findByIdAndUpdate(id, category, { new: true, runValidators: true }, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            category: categoryDB
        })

    });

})

module.exports = app;