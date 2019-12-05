require('./config/environment');
require('./config/config');

const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');


// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parse application/json
app.use(bodyParser.json())

//Global config of routes
app.use(require('./routes/routes'));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, res)=>{
    if(err) throw err;

    console.log('DB started ...');
});

app.listen(PORT, () => {
    console.log(`Running in the port ${PORT} ...`);
})