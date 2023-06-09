const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        required: true
    },
})

module.exports = Rdv = mongoose.model('rdv',UserSchema)