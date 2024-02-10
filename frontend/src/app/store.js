// Welcome to the Redux Store!
// Feel free to look around and if you need anything at all just trigger a reducer. ;)

//general import/config
import { configureStore } from '@reduxjs/toolkit'
//so there several functions in these slices, but the only ones the store needs are the ones specifically named 'reducer'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'

//be sure to export them. Adding them here will make them appear in the redux extension under 'state' and makes the state available to the app
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
})
