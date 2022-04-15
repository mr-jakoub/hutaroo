/* eslint-disable */
const express = require('express')
const connectDB = require('./config/db')
const fileUpload = require('express-fileupload')

const app = express()
// Connect Database
connectDB()
// Init Middleware /* to allow req.body */
app.use(express.json({extended: false}))
// Upload files
app.use(fileUpload({ createParentPath: true }))//1mb

app.get('/', (req, res)=> res.send('API Running'))

// Define Routes
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/comments',require('./routes/api/comments'))

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`) )