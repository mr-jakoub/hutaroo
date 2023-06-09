/* eslint-disable */
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Rdv = require('../../models/Rdv')
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
        let accepted = email === 'admin@vacci.com' ? true : false
        user = new User({
            account_type,
            name,
            email,
            password,
            gender,
            phone,
            avatar,
            birthdate,
            accepted
        })
        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        if(email === 'admin@vacci.com'){
            user.account_type = 'admin'
        }
        await user.save()
        
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
        const users = await User.find().sort({ date:-1 }).select('-password') // Get the recent users
        res.json(users)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route    DELETE api/users
// @desc     Delete user
// @access   Private

router.delete('/:id', auth, async (req,res)=>{
    try {
        // Remove user
        await User.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/users/accept
// @desc    Update security information
// @access  Private
router.post('/accept/:id',auth, async (req,res)=>{
    // Update
    try {
        let userField = {}
        let user = await User.findById(req.user.id)
        userField.accepted = true
        user = await User.findOneAndUpdate({ _id: req.params.id }, {$set: userField}, { upsert: true, new: true })
        return res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }

})

// @route   POST api/users/rdv
// @desc    rdv
// @access  Private
router.post('/rdv', [ auth,[
    check('rdvDate','Please include a valid date').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let { rdvDate } = req.body
    try {
        let user = await User.findById(req.user.id)
        let rdv = new Rdv({
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            date: rdvDate
        })
        await rdv.save()
        return res.json(rdv)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/users/rdv
// @desc    Get all rdvs
// @access  public
router.get('/rdv', async (req,res)=>{
    try {
        const rdvs = await Rdv.find().sort({ date:1 })
        res.json(rdvs)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route    DELETE api/users/rdv/:id
// @desc     Delete user
// @access   Private

router.delete('/rdv/:id', auth, async (req,res)=>{
    try {
        // Remove user
        await Rdv.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'appointment deleted' })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router