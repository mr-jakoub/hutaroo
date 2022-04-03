/* eslint-disable */
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Post = require('../../models/Post')
const {check, validationResult} = require('express-validator')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [ auth, [
    check('text','Text is required').isLength({ max: 5000 })
] ], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const { text, feeling, location, link } = req.body
        const newPost = new Post({
            text,
            feeling,
            location,
            link,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req,res)=>{
    try {
        const posts = await Post.find().sort({ date:-1 }) // Get the recent posts
        res.json(posts)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({ msg: 'Post not found !' })
        res.json(post)
    } catch (err) {
        console.log(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Post not found !' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({ msg: 'Post not found !' })
        // Check if the owner of the post who will delete it
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized' })
        }
        // Remve comments
        await Comment.deleteMany({ postId: post._id })
        await post.remove()
        res.json({ msg: 'Post removed !' })
    } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Post not found !' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/rise/:id
// @desc    Rise a post
// @access  Private
router.put('/rise/:id', auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // Check if the post has already been rised
        if(post.rises.filter(rise=> rise.user.toString() === req.user.id).length > 0){
            // Get remove index
            const removeIndex = post.rises.map(rise=> rise.user.toString()).indexOf(req.user.id)
            post.rises.splice(removeIndex, 1)
            await post.save()
            return res.json(post.rises)
        }
        post.rises.unshift({ user: req.user.id })
        await post.save()
        res.json(post.rises)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // Check if the post has already been liked
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
            // Get remove index
            const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)
            await post.save()
            return res.json(post.likes)
        }
        post.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post.likes)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

module.exports = router