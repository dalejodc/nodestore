var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    name:{
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
    isAssignabke:{
        type: boolean,
        required: true
    }
})