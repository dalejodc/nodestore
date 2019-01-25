const express = require('express')
const checkToken = require('../middlewares/authentication').checkToken
const app = express()

const Product = require('../models/product')

app.get('/products/all', (req, res) => {

})

app.get('/products/category', (req, res) => {

})

app.get('/products/disabled', (req, res) => {

})

app.post('/product', (req, res) => {

})

app.put('/product/:id', (req, res) => {


});

app.put('/product/disable/:id', (req, res) => {
    
    
});

app.delete('/product/:id', (req, res) => {


});



module.exports = app;