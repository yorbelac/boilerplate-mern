// authMiddleware is exists only to check the Bearer token in the header of the request and to return the corresponding user ID to the req.URL (the incoming request URL)
// the routeControllers will check req.params.id, i do not know how req.user.id is enough as req.params.id, but it does

// this middleware uses jsonwebtoken and the User.Model schema.
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// this function takes in the request, produces a response, and then explicitely triggers the next function in the stack
const protect = asyncHandler(async (req, res, next) => {

  let token
  
  if ( // if auth headers exist and start with 'Bearer' 
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {      
      token = req.headers.authorization.split(' ')[1] // Split the header into an array at the ' ' and collect the token from position[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET) // JWT verify method takes in the token and .env variable JWT_SECRET and produces a big JWT string with a 'User' in the payload      
      req.user = await User.findById(decoded.id).select('-password') // matches decoded id (with the password scrubbed out) to a User.model id, and assigns the full matching User record to req.user      
      next() // summons the next function in the route stack
    } catch (error) {
      // whatever error occurs, always say not authorized 401
      console.log(error); res.status(401); throw new Error('Not authorized')
    }
  }

  // if no token, say so.
  if (!token) {
    res.status(401); throw new Error('Not authorized, no token')
  }
})

//export
module.exports = { protect }
