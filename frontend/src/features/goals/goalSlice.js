//goalSlice redux global state for goals

//imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

//define initial state
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// CREATE
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try { //get token
    const token = thunkAPI.getState().auth.user.token
    return await goalService.createGoal(goalData, token)

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// READ (GET)
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try { //get token
    const token = thunkAPI.getState().auth.user.token
    return await goalService.getGoals(token)

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//UPDATE
//you can do a function like this just the same but in the extra reducer you're going to filter out and then add back in (replace) the updated state
export const updateGoal = createAsyncThunk('goals/update', async (goalData, thunkAPI) => {
  try { //get token
    const token = thunkAPI.getState().auth.user.token
    return await goalService.updateGoal(goalData, token)

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// DELETE
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
  try { //get token
    const token = thunkAPI.getState().auth.user.token
    return await goalService.deleteGoal(id, token)

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//DEFINE SLICE
export const goalSlice = createSlice({

  name: 'goal',
  initialState,

  reducers: { //non-async actions
    reset: (state) => initialState,
  },

  extraReducers: (builder) => { //extraReducers for async actions
    builder //all have pending/fulfilled/rejected states, actionable at each step.

      //CREATE
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload) //push newly created goal to state array
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      //GET
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload //replace entire state array with gotten goals
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      //UPDATE
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.id) //filter deleted goal from state array
        state.goals.push(action.payload) //push updated goal to state array
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      //DELETE
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.id) //filter deleted goal from state array
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload //error, return error to state message
      })
  },
})

//exports
export const { reset } = goalSlice.actions
export default goalSlice.reducer
