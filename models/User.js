const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    account_type:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        default: 0
    },
    gender:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    birthdate:{
        type: Date,
        required: true
    },
    accepted:{
        type: Boolean,
        default: false
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "user"
            },
            vaccinetype:{
                type: String,
                required: true
            },
            stuffName:{
                type: String,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = User = mongoose.model('user',UserSchema)