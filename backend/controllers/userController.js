//userController provides logic to POST and GET requests made to userRoutes

//requires JWT and bcrypt to create and compare tokens
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
//requires and uses the User.model schema from mongoose
const User = require('../models/userModel')

// POST /api/users: Register new user
const registerUser = asyncHandler(async (req, res) => {

  //creates three variablers from the req.body. I guess you can use this syntax and it just knows to assign them the corresponding array value.
  const { name, email, password } = req.body

  // if missing any of these values say so
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check database with User.findOne for the email
  const userExists = await User.findOne({ email })

    //if userExists bears a match or is anything other than false or null alert requester that user exists.
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // create a 'salt' which is like a pollutant for the password.
  const salt = await bcrypt.genSalt(10)
  // bcrypt.hash(pw, salt) generates a hashed password
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user in db with User.create, use name and email from req.body and use the hashed password for the password
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  //if user variable received data must have succeeded so return to the requester the json for the user, and generate a new token with the user._id. generateToken() function is near the bottom
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })

    // if !user throw error.
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// POST /api/users/login: login
const loginUser = asyncHandler(async (req, res) => {

  //collect email and password from req.body send to variables.
  const { email, password } = req.body

  // try to match collected email to db user with User.findOne({email})
  const user = await User.findOne({ email })

  //if user ok and if bcrypt.compare can match the hashed password with the requester's password then return to the requester JSON of _id,name,email,and generate a new token from _.id
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })

    //if user not matched, or bcrypt password not matched, say so.
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// GET /api/users/me
// this is the only request in userController that passes through authMiddleware and so has compared a token and carries a req.user object
const getMe = asyncHandler(async (req, res) => {
  //just turns the req.user JSON data
  res.status(200).json(req.user)
})

// Generate JWT
// jwt.sign({id},secret,{expiresIn:'TT'}) secret is stored in an .env variable. Function returns the token to be applied whereever.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

//export all the functions herein
module.exports = {
  registerUser,
  loginUser,
  getMe,
}
