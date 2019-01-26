const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [
            true, 'The name is required'
        ]
    },
    description: {
        type: String,
        required: [
            true, 'The description is required'
        ]
    },
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Category', categorySchema);