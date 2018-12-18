require('./config/config');

const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const express = require('express')
const app = express()

app.use(require('./routes/user'));

mongoose.connect('mongodb://localhost:27017/products', (err, res)=>{
    if(err) throw err;

    console.log('DB started.');
});

app.listen(PORT, () => {
    console.log(`Runnign in the port ${PORT}`);
})