/* eslint-disable */
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const {check, validationResult} = require('express-validator')

// @route   GET api/comments
// @desc    Get all post comments
// @access  Private
router.get('/', auth, async (req,res)=>{
    try {
        const comments = await Comment.find().sort({ date:-1 }) // Get the recent posts
        res.json(comments)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// @route   GET api/comments/:id
// @desc    Get comment by ID
// @access  Private
router.get('/:id', auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({ msg: 'Post not found !' })
        res.json(post)
    } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Post not found !' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   COMMENT api/comments/:id
// @desc    Create a comment
// @access  Private
router.post('/:id',[ auth, [
    check('text','Text is required').not().isEmpty()
] ], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // create comment
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        if(!post)return res.status(400).json({ msg: "Post does not exist." })
        
        const newComment = new Comment({
            postId: req.params.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const comment = await newComment.save()
        res.json(comment)
    } catch (err) {
        res.status(500).send('Server Error')
    }

})

// @route   PUT api/comments/like/:id
// @desc    Like a comment
// @access  Private
router.put('/like/:id', auth, async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        // Check if the comment has already been liked
        if(comment.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
            // Get remove index
            const removeIndex = comment.likes.map(like=> like.user.toString()).indexOf(req.user.id)
            comment.likes.splice(removeIndex, 1)
            await comment.save()
            return res.json(comment.likes)
        }
        // check if the comment has been disliked
        if(comment.dislikes.filter(dislike=> dislike.user.toString() === req.user.id).length > 0){
            // Get remove index
            const removeIndex = comment.dislikes.map(dislike=> dislike.user.toString()).indexOf(req.user.id)
            comment.dislikes.splice(removeIndex, 1)
            await comment.save()
        }
        comment.likes.unshift({ user: req.user.id })
        await comment.save()
        res.json(comment.likes)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/comments/dislike/:id
// @desc    Dislike a comment
// @access  Private
router.put('/dislike/:id', auth, async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        // Check if the comment has already been disliked
        if(comment.dislikes.filter(dislike=> dislike.user.toString() === req.user.id).length > 0){
            // Get remove index
            const removeIndex = comment.dislikes.map(dislike=> dislike.user.toString()).indexOf(req.user.id)
            comment.dislikes.splice(removeIndex, 1)
            await comment.save()
            return res.json(comment.dislikes)
        }
        // Check if the comment has been liked
        if(comment.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
            // Get remove index
            const removeIndex = comment.likes.map(like=> like.user.toString()).indexOf(req.user.id)
            comment.likes.splice(removeIndex, 1)
            await comment.save()
        }
        comment.dislikes.unshift({ user: req.user.id })
        await comment.save()
        res.json(comment.dislikes)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', auth , async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        const post = await Post.findById(comment.postId)
        if(!comment) return res.status(404).json({ msg: 'Comment does not exist.' })
        // Check if the owner of the comment who will delete it
        if(comment.user.toString() !== req.user.id){
            if(req.user.id === post.user.toString()){
                await comment.remove()
                return res.json({ msg: 'Comment removed !' })
            }
            return res.status(401).json({ msg: 'User not authorized' })
        }
        await comment.remove()
        res.json({ msg: 'Comment removed !' })
    } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Comment does not exist.' })
        }
        res.status(500).send('Server Error')
    }
})

module.exports = router