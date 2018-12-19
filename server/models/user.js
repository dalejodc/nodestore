import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type: String, 
        required: [true, 'The user name is required.']
    },
    email: {
        type: String, 
        required: [true, 'The email is required']
    },
    password: {
        type: String, 
        required: [true, 'The password is required']
    },
    image: {
        type: String, 
        required: false
    },
    rol:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: boolean,
        default:false
    },
    state:{
        type: boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);
