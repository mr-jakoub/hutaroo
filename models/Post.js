const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    text:{
        type: String,
        required: true
    },
    feeling:{
        type: String
    },
    location:{
        type: String
    },
    link:{
        type: String
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    rises:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post',PostSchema)