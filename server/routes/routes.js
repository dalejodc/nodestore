const express = require('express')
const app = express()

app.use(require('./user'));
app.use(require('./login'));
app.use(require('./category'));
app.use(require('./product'));
app.use(require('./menu'));
app.use(require('./role'));

module.exports = app;