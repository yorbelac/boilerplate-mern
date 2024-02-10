//authService API calls for Auth

//imports
import axios from 'axios'
// !!IMPORTANT this url suffix is predicated by the url proxy in frontend package.json, change the proxy to change server receiving the api calls
// https://www.youtube.com/watch?v=mvfsC66xqj0  44:31
const API_URL = '/api/users/'


// REGISTER
const register = async (userData) => {  
  const response = await axios.post(API_URL, userData) //axios.POST

  if (response.data) { // commit response to localStorage for persistent login
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// LOGIN
const login = async (userData) => {  
  const response = await axios.post(API_URL + 'login', userData) // axios.POST(login)

  if (response.data) { // commit response to localStorage for persistent login
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// LOGOUT
const logout = () => {
  localStorage.removeItem('user') //remove 'user' from local storage
}


//exports
const authService = {register,logout,login}
export default authService
