const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} is not a valid rol'
};

let userSchema = new Schema({
    name:{
        type: String, 
        required: [true, 'The user name is required.']
    },
    email: {
        type: String, 
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'The password is required']
    },
    image: {
        type: String, 
        required: false
    },
    role:{
        type: String,
        required: true,
        default: 'USER',
        enum: validRoles
    },
    google:{
        type: Boolean,
        default:false
    },
    state:{
        type: Boolean,
        default: true
    }
});

userSchema.plugin(uniqueValidator, {message: 'we are sorry, that {PATH} is taken'});

module.exports = mongoose.model('User', userSchema);