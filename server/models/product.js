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
    isAvailable: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

module.exports = mongoose.model('Product', productSchema);