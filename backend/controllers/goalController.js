// goalController.js controls what is returned by requests to the api/goals route

//requires express
const asyncHandler = require('express-async-handler')
//declares the mongoose.Model(s) that are used in the controller
const Goal = require('../models/goalModel')


// REQUESTS /////////////////////////////////////////////////////////////////////////////

// api/goals.GET
// Goal.find()
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }) //mongoose return goals matching req.user.id
  res.status(200).json(goals) //status GOOD
})

// api/goals.POST
// Goal.create()
const setGoal = asyncHandler(async (req, res) => {
  
  //validate req.body.text 
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  //mongoose create goal from req data
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  //status GOOD
  res.status(200).json(goal)
})

// api/goals/:id.PUT
// Goal.findByIdAndUpdate(,)
const updateGoal = asyncHandler(async (req, res) => {
  // mongoose use params.id to locate matching goal
  const goal = await Goal.findById(req.params.id)

  // if no matching goal, say so
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // if no req.user say so
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // if the matched goal.user from db does not match req.user.id say so.
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // if no error mongoose Goal.findByIdAndUpdate(id,body,{new:true})
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  // status GOOD
  res.status(200).json(updatedGoal)
})

// api/goals/:id.DELETE
// goal.remove()
const deleteGoal = asyncHandler(async (req, res) => {
  
  //mongoose match params.id to goal
  const goal = await Goal.findById(req.params.id)

  //if no match say so
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // if no req.user say so
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // compare matched db goal.user to req.user.id, and if not, say so.
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // mongoose remove goal
  await goal.remove()

  //return deleted id (used by app to validate removal & remove from state/global-state)
  res.status(200).json({ id: req.params.id })
})

//exports
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
