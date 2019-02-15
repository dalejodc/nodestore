var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'The name of the product is required'] 
    },
    description: { 
        type: String, 
        required: false 
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Role', roleSchema);