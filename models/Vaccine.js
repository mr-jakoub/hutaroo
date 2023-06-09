const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VaccineSchema = new Schema({
    quantity:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Vaccine = mongoose.model('vaccine',VaccineSchema)