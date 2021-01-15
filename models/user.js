const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userShcema = new Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    telephone: String,
    createdOn: {
        default: new Date(),
        type: Date
    },
    updatedOn: Date
})

module.exports = mongoose.model('user', userShcema)