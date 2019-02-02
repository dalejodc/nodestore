const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Category = require('../models/category')

// Method to get all the enabled categories
app.get('/categories', checkToken, (req, res) => {

    Category.find({state: true}, 'id name')
        .sort('description')
        .populate('user', 'name email') //To reference documents in other collections.
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

// Method to get all the disabled categories
app.get('/categories/disabled', checkToken, (req, res) => {

    Category.find({state: false}, 'id name')
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
        name: body.name,
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

        //Not needed
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

        res.json({
            ok: true,
            category: categoryDB
        })

    });

})

//Method to disable a category by id
app.put('/category/disable/:id', checkToken, (req, res) => {

    let id = req.params.id;

    let category = {
        state: false
    };

    Category.findByIdAndUpdate(id, category, { new: true, runValidators: true }, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            category: categoryDB,
            message: `${categoryDB.description} disabled`
        })

    });

})

//Method to enable a category by id
app.put('/category/enable/:id', checkToken, (req, res) => {

    let id = req.params.id;

    let category = {
        state: true
    };

    Category.findByIdAndUpdate(id, category, { new: true, runValidators: true }, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
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

//Method to delete the category
app.delete('/category/:id', [checkToken], (req, res) => {
    
    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, del)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            message: "Category deleted"
        })
    });
})


module.exports = app;