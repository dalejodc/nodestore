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

//Method to get a product by ID
app.get('/product/:id', (req, res) => {

    let id = req.params.id;

    Product.find({ state: true, _id: id }, 'name description unitPrice')
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

//Method to get al the disabled products
app.get('/products-disabled', (req, res) => {

    Product.find({ state: false }, 'name description unitPrice state')
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

//Method to update a product by ID
app.put('/product/:id', checkToken, (req, res) => {
    let id = req.params.id;
    let body = req.body

    let product = {
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        category: body.category,
        state: body.state
    }

    Product.findByIdAndUpdate(id, product, { new: true, runValidators: true }, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            product: productDB
        })

    });

});

//Method to disable a product by ID
app.put('/product/disable/:id', (req, res) => {
    let id = req.params.id;

    let product = {
        state: false
    };

    Product.findByIdAndUpdate(id, product, { new: true, runValidators: true }, (err, productDB) => {

        err ? res.status(400).json({ ok: false, err }) : res.json({ ok: true, product: productDB, message: `${productDB.name} disabled` });      

    });

});

//Method to enable a product by ID
app.put('/product/enable/:id', (req, res) => {
    let id = req.params.id;

    let product = {
        state: true
    };

    Product.findByIdAndUpdate(id, product, { new: true, runValidators: true }, (err, productDB) => {

        if(err){
            res.status(400).json({ 
                ok: false, 
                err 
            })
        }
        
        res.json({ 
            ok: true, product: productDB, 
            message: `${productDB.name} enabled` 
        });      

    });

});

//Method to delete a product
app.delete('/product/:id', [checkToken], (req, res) => {

    let id = req.params.id;

    Product.findByIdAndRemove(id, (err, del) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            message: "Product deleted"
        })
    });
})




module.exports = app;