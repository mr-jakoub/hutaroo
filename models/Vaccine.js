const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VaccineSchema = new Schema({
    quantity:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    recommandedAge:{
        type: String,
        required: true
    },
    expDate:{
        type: Date,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Vaccine = mongoose.model('vaccine',VaccineSchema)