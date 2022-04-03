/* eslint-disable */
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const {check, validationResult} = require('express-validator')

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id }).populate('user',['name','avatar','email','phone'])
        if(!profile){
            res.status(400).json({ msg: 'There is no profile for this user' })
        }
        let post = await Post.find({ user: req.user.id })
        var allRises = 0
        post.map(element=>{
            allRises += element.rises.length
        })
        
        // Handle rank
        let { followers } = profile
        let rankField = {}
        if(allRises >= 10 && followers.length >= 100){
            rankField.rank = "Silver"
        }else if(allRises >= 100 && followers.length >= 1000){
            rankField.rank = "Gold"
        }else if(allRises >= 1000 && followers.length >= 10000){
            rankField.rank = "Platinum"
        }else if(allRises >= 10000 && followers.length >= 100000){
            rankField.rank = "Diamond"
        }else{
            rankField.rank = "Bronze"
        }
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, {$set: rankField}, { new: true })
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/profile/info
// @desc    Update user profile
// @access  Private
router.post('/info',[ auth, [
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email address').isEmail(),
    check('gender','Gender is required').not().isEmpty(),
    check('birthdate','Please include a valid birthdate').isDate({format: 'YYYY-MM-DD'})
] ], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    let user = await User.findById(req.user.id)
    const myEmail = user.email
    let { name, email, phone, location, birthdate, gender,
        bio, school, degree, fieldofstudy, average, from, to
    } = req.body
    // Build profile & user object
    // Avatar
    if(req.files){
        let avatar = req.files.avatar
        if(!req.files){
            console.log("No profile image choosen")
        }else{
            //check type of image we will accept only png || jpg || jpeg
            if (!avatar.mimetype.includes('jpeg') && !avatar.mimetype.includes('png') && !avatar.mimetype.includes('jpg') && !avatar.mimetype.includes('gif')) {
              return res.statut(400).json({ errors: 'Please include a valid image format "png, jpg, jpeg, gif "' })
            }
            //check file size max file 1 megabyte
            if (avatar.size > 1024 * 1024 * 2) { return res.statut(400).json({ errors: 'The file is too large' })}
        }
    }
    let IDandRandom = Math.floor(Math.random() * 1000) + req.user.id

    // User
    let otherUser = await User.findOne({ email })
    if (otherUser && email !== myEmail) {
        return res.status(400).json({ errors: [{msg: 'Email already used'}] })
    }
    const userFields = { name, email, phone, gender, birthdate }
    for(const [key, value] of Object.entries(userFields)) {
        if (value && value.length > 0) {
            userFields[key] = value
        }
    }
    if(req.files){
        userFields.avatar = `/upload/profile/${IDandRandom + req.files.avatar.name.replace(' ','')}`
    }else{
        userFields.avatar = user.avatar
    }

    // Posts
    const postFields = { name }
    for(const [key, value] of Object.entries(postFields)) {
        if (value && value.length > 0) {
            postFields[key] = value
        }
    }
    if(req.files){
        postFields.avatar = `/upload/profile/${IDandRandom + req.files.avatar.name.replace(' ','')}`
    }else{
        postFields.avatar = user.avatar
    }
    // Profile
    const profileFields = { location, bio }
    for(const [key, value] of Object.entries(profileFields)) {
        if (value && value.length > 0) {
            profileFields[key] = value
        }
    }
    // Education
    const educationFields = { school, degree, fieldofstudy, average, from, to }
    for(const [key, value] of Object.entries(educationFields)) {
        if (value && value.length > 0) {
          educationFields[key] = value
        }
    }
    profileFields.education = educationFields

    // Update
    try {
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { upsert: true, new: true }).populate('user',['name', 'avatar', 'email', 'phone'])
        me = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userFields }, { upsert: true, new: true })
        // Delete old profile pic
        if(req.files && user.avatar !== "default"){
            // Move new image to profile destination
            req.files.avatar.mv('client/public/upload/profile/' + (IDandRandom + req.files.avatar.name.replace(' ','')))
            // Remove old image
            fs.unlinkSync(`client/public/${user.avatar}`)
            await Post.updateMany({ user: req.user.id }, { $set: postFields }, { multi: true, upsert: true, new: true })
            return res.json(profile)
        }else if(req.files){
            // Move new image to profile destination
            req.files.avatar.mv('client/public/upload/profile/' + (IDandRandom + req.files.avatar.name.replace(' ','')))
            return res.json(profile)
        }else{
            return res.json(profile)
        }
    } catch (err) {
        console.log(err.message)
        res.status(100).send('Server Error')
    }

})

// @route   POST api/profile/security
// @desc    Update security information
// @access  Private
router.post('/security',[ auth, [
    check('secret_word','Password is required').exists(),
    check('current_password','Password is required').exists()
] ], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    let { current_password,  new_password, secret_word } = req.body
    
    // Update
    try {
        let securityFields = {}
        if(new_password.length >0){
            if(new_password.length < 6){
                return res.status(400).json({ errors: [{msg: 'Password must be at least 6 characters'}] })
            }
            // Encrypt password
            const salt = await bcrypt.genSalt(10)
            securityFields.password = await bcrypt.hash(new_password, salt)
        }
        let user = await User.findById(req.user.id)
        // Check password
        const isMatch = await bcrypt.compare(current_password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors: [{msg: 'Current password incorrect'}] })
        }
        if(secret_word) securityFields.secret_word = secret_word
        user = await User.findOneAndUpdate({ _id: req.user.id }, {$set: securityFields}, { upsert: true, new: true })
        return res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }

})

// @route   GET api/profile
// @desc    Get all profiles
// @access  public
router.get('/', async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name', 'avatar', 'account_type'])
        res.json(profiles)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  public
router.get('/user/:user_id', async (req,res)=>{
    try {
        const profile = await Profile.findOne({ user:req.params.user_id }).populate('user',['name', 'avatar', 'email', 'phone'])
        if(!profile) return res.status(400).json({ msg: 'Profile not found !' })
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found !' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/profile
// @desc    DELETE profile, user & posts
// @access  Private
router.delete('/', auth, async (req,res)=>{
    try {
        // Remve comments
        await Comment.deleteMany({ user: req.user.id })
        // Remove posts
        await Post.deleteMany({ user: req.user.id })
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router