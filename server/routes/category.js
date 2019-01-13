const express = require('express')
const app = express()

const checkToken = require('../middlewares/authentication').checkToken
const Category = require('../models/category')