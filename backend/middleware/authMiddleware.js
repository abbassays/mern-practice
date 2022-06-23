const jsonwebtoken = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const { json } = require('body-parser');

const protect = asyncHandler(async (req, res, next) => {
    // Get token
    let token = req.headers.authorization
    // if token is valid

    if (!token) {
        res.status(401)
        throw new Error('Not authorized because token not found')
    }

    if (token.startsWith('Bearer') && token) {

        try {
            // split it 
            token = token.split(' ')[1]

            // get secret
            const secret = process.env.JWT_SECRET

            // verify it
            const decoded = jsonwebtoken.verify(token, secret)

            // get user from token & dont return password
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

})

module.exports = {
    protect
};
