// goalService calls backend API for goals

//imports/initialVariables
import axios from 'axios'
// !!IMPORTANT this url suffix is predicated by the url proxy in frontend package.json, change the proxy to change server receiving the api calls
// https://www.youtube.com/watch?v=mvfsC66xqj0  44:31
const API_URL = '/api/goals/'

// CREATE
const createGoal = async (goalData, token) => {
  //auth Header
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  //axios.POST
  const response = await axios.post(API_URL, goalData, config)
  return response.data
}

// GET
const getGoals = async (token) => {
  //auth Header
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  //axios.GET
  const response = await axios.get(API_URL, config)
  return response.data
}

// UPDATE
const updateGoal = async (goalData, token) => {
  //auth Header
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const id = goalData._id
  //axios.PUT
  const response = await axios.put(API_URL + id, goalData, config)
  return(response.data)
}

// DELETE
const deleteGoal = async (goalId, token) => {
  //auth Header
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  //axios.DELETE(id in params)
  const response = await axios.delete(API_URL + goalId, config)
  return response.data
}

//exports
const goalService = { createGoal, getGoals, updateGoal, deleteGoal }
export default goalService
