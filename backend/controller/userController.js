const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    // Check if all fields are filled
    const { name, email, password } = req.body
    if (!email || !name || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    // check if user exist
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPass = await bcryptjs.hash(password, salt)
    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPass
    })
    // Register user if does not exist 
    if (user) {
        res.status(201).json({
            action: 'User registered!',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    // Return error if user exists
    else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //  find user
    const user = await User.findOne({ email })
    // decrypt and compare password
    const passCorrect = await bcryptjs.compare(password, user.password)
    // Check if password is correct
    if (user && passCorrect) {
        res.json({
            action: 'User logged in!',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        })
    }
    // Return error if email or password is wrong
    else {
        throw new Error('Email and Password do not match!')
    }
})

const getUser = asyncHandler(async (req, res) => {
    // find user
    const { _id, name, email } = await User.findById(req.user.id)
    // return user
    res.status(200).json({
        id: _id, name, email
    })
})

const generateToken = (id) => {
    // create and generate token
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
};
