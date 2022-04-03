const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    validated:{
        type: Boolean,
        default: false
    },
    rank:{
        type: String,
        default: "Bronze"
    },
    posts:{
        type: Number,
        default: 0
    },
    followers:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    rises:{
        type: Number,
        default: 0
    },
    location:{
        type: String
    },
    bio:{
        type: String
    },
    education:{
        school:{
            type: String
        },
        degree:{
            type: String
        },
        fieldofstudy:{
            type: String
        },
        from:{
            type: Date,
            default: Date.now
        },
        to:{
            type: Date,
            default: Date.now
        },
        average:{
            type: String
        }
    }
})

module.exports = User = mongoose.model('profile',ProfileSchema)