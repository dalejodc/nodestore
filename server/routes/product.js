const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Product = require('../models/product')
const Category = require('../models/category')

app.get('/products/all', (req, res) => {
    
    Product.find({ state: true }, 'name description unitPrice')
        .sort('name')
        .populate('category', 'name') //To reference documents in other collections.
        .exec((err, productsDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }


            res.json({
                ok: true,
                products: productsDB
            });

        });
})

app.get('/products/:id', (req, res) => {

    let id = req.params.id;

    Product.find({ state: true, category: id }, 'name description unitPrice')
        .sort('name')
        .populate('category', 'name') //To reference documents in other collections.
        .exec((err, productsDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }


            res.json({
                ok: true,
                products: productsDB
            });

        });

})

app.get('/products-disabled', (req, res) => {
    
    Product.find({ state: false}, 'name description unitPrice')
    .sort('name')
    .populate('category', 'name') //To reference documents in other collections.
    .exec((err, productsDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            products: productsDB
        });

    });
})

//Method to save a product
app.post('/product', checkToken, (req, res) => {

    let body = req.body;

    let product = new Product({
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        category: body.category,
        user: req.user._id,
        state: true
    })

    product.save((err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        res.status(201).json({
            ok: true,
            product: productDB
        })
    })

})

app.put('/product/:id', (req, res) => {


});

app.put('/product/disable/:id', (req, res) => {


});

app.delete('/product/:id', (req, res) => {


});



module.exports = app;