//goalRoutes directs api/goals calls to respective controllers

const express = require('express')
const router = express.Router()
const {getGoals,setGoal,updateGoal,deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

//all routes protected by middleware / requires logged in user
router.route('/').get(protect, getGoals).post(protect, setGoal)
//for update and delete requires params.id
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

//exports (as router), called via app.use and special syntax at server.js
module.exports = router
