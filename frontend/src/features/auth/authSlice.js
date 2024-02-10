//authSlice global state for user/authentication

//imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
const user = JSON.parse(localStorage.getItem('user')) //user from localStorage for persistent login

// Define initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// REGISTER
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {

    try {
      return await authService.register(user)

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// LOGIN
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {

  try {
    return await authService.login(user)

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// LOGOUT
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// DEFINE SLICE
export const authSlice = createSlice({
  
  name: 'auth',
  initialState,
  
  reducers: { //non-async actions
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },

  extraReducers: (builder) => { //extraReducers for async actions
    builder //all have pending/fulfilled/rejected states, actionable at each step.


      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload //set returned user to logged in
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload //error, return error message
        state.user = null //no user
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload //set returned user to logged in
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload //error, return error message
        state.user = null //no user
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null //no user (triggers dom to reflect logout)
      })

  },
})

//exports
export const { reset } = authSlice.actions
export default authSlice.reducer
