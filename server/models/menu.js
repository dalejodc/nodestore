var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: false
    },
    isAssignable:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Menu', menuSchema);