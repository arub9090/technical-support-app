const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a Name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide valid Password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true,
})


module.exports= mongoose.model('User', userSchema)