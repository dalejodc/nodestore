var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'The name of the product is required'] 
    },
    unitPrice: { 
        type: Number, 
        required: [true, 'The unit price of the product is required'] 
    },
    description: { 
        type: String, 
        required: false 
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Product', productSchema);