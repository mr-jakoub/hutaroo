/* eslint-disable */
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Vaccine = require('../../models/Vaccine')
const {check, validationResult} = require('express-validator')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [ auth, [
    check('name','Text is required').isLength({ max: 5000 })
] ], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { name, quantity, recommandedAge, expDate } = req.body
        let oldvaccine = await Vaccine.findOne({ name })
        if(oldvaccine){
            return res.status(400).json({ errors: [{msg: 'This vaccine already exists !'}] })
        }
        const newPost = new Vaccine({
            quantity,
            name,
            recommandedAge,
            expDate
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
        const posts = await Vaccine.find().sort({ date:-1 }) // Get the recent posts
        res.json(posts)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, async (req,res)=>{
    try {
        const post = await Vaccine.findById(req.params.id)
        if(!post) return res.status(404).json({ msg: 'Vaccine not found !' })
        await post.remove()
        res.json({ msg: 'Vaccine removed !' })
    } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Vaccine not found !' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', [ auth, [
    check('vaccinetype','vaccine type is required').isLength({ max: 5000 })
] ], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.params.id)
        const stuff = await User.findById(req.user.id).select('-password')

        const { vaccinetype } = req.body
        let oldvaccine = await Vaccine.findOne({ name: vaccinetype })
        console.log(oldvaccine,vaccinetype)

        const vaccinefields = { quantity: oldvaccine.quantity - 1 }

        await Vaccine.findOneAndUpdate({ name: vaccinetype }, { $set: vaccinefields }, { upsert: true, new: true })

        user.likes.unshift({ user: req.user.id, stuffName: stuff.name, vaccinetype: vaccinetype })
        await user.save()
        res.json(user.likes)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

module.exports = router