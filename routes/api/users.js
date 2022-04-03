/* eslint-disable */
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const config = require('config')
const { check, validationResult } = require('express-validator')

// @route   POST api/users
// @desc    Register
// @access  Public
router.post('/', [
    check('account_type','Account type is required').not().isEmpty(),
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email address').isEmail(),
    check('password','Password must be at least 6 characters').isLength({ min: 6 }),
    check('gender','Gender is required').not().isEmpty(),
    check('birthdate','Please include a valid birthdate').isDate({format: 'YYYY-MM-DD'})
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let { account_type, name, email, phone, password, gender, birthdate } = req.body
    
    try {
        // See if user exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{msg: 'You are already one of us'}] })
        }
        // Get users gravatar
        const avatar = "default"
        let secret_word = password
        user = new User({
            account_type,
            name,
            email,
            password,
            gender,
            phone,
            avatar,
            birthdate,
            secret_word
        })
        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        
        // Create profile for user
            // Build profile object
            const profileFields = {
                user: user.id,
                location: "Hutaro.",
                bio: "Hutaro."
            }
            profileFields.education = {
                school: 'Hutaro.',
                degree: 'Hutaro.',
                fieldofstudy: 'Hutaro.',
                average: '20'
            }
            profile = new Profile(profileFields)
            await profile.save()
        
        // Return JWT
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn : config.get('jwtExpiresIn')}, (err, token)=>{
            if (err) throw err
            res.json({ token })
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }

})

// @route   GET api/users/recent
// @desc    Get recent users
// @access  public
router.get('/recent', async (req,res)=>{
    try {
        const users = await User.find().sort({ date:-1 }).select('avatar') // Get the recent users
        res.json(users)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router