const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');


function getInvalidResponse(message, res) {
    return res.status(400).json({message, result: false})
}

function getValidResponse(message, res, userId) {
    return res.status(200).json({message, result: true, userId})
}


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (password.includes(username) || (password.includes(email)))
            return getInvalidResponse("Password cannot contain username or email", res)

        if (!email.includes('@')) {
            return getInvalidResponse("Email format wrong. Should contain domain name", res)
        } else {
            const emailFormat = email.split('@')
            if (emailFormat[0].length < 1)
                return getInvalidResponse("Email should contain 1 or more characters", res)
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // check user in db
        const existingUser = await User.findOne({ username: username })

        // if user does not exist in db
        if (!existingUser) {
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
                registration_date_time: new Date()
            })

            await newUser.save()
            return getValidResponse("Sign up successful", res, newUser._id)
        }
        return getInvalidResponse("User already exists", res)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(req.sessionID)
        const {username, password} = req.body
        const existingUser = await User.findOne({username: username})

        if (existingUser) {
            if (req.sessionID.authenticated) {
                return getValidResponse("User logged in", res)
            } else {
                const isValidPassword = await bcrypt.compare(password, existingUser.password)
                if (isValidPassword) {
                    req.session.authenticated = true
                    req.session.user = {
                        username, password
                    }
                    return getValidResponse("User logged in", res, existingUser._id)
                } else {
                    return getInvalidResponse("Wrong Password", res)
                }
            }
        } else {
            return getInvalidResponse("User not found.", res)
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})



module.exports = router