//userRoutes handles requests to POST.('/'), POST('/login'), and GET.('/me')

//requires express and express.router
const express = require('express')
const router = express.Router()

//requires the functions from userController to match them with requests, as well as {protect} from auth middleware
const {registerUser,loginUser,getMe,} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

//POST.('/')
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

//exports (as router), called via app.use and special syntax at server.js
module.exports = router
