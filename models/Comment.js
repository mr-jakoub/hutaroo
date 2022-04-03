const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref: "post"
    },
    text:{
        type: String,
        required: true
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
    dislikes:[
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

module.exports = Comment = mongoose.model('comment',CommentSchema)