import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URI} from '../../config/keys-dev';

const initialState ={
    name: '',
    mobile: '',
    email: '',
    password: '',
    status: 'idle',
    error: null
}

// Handle POST request to create a new account
export const signup = createAsyncThunk(
    // The name of the action
    'register/signup',
    // The payload creator
    async (initialData, thunkAPI) => {
      try {
        //const res = await axios.post(url, initialData)
        const res = await axios.post(`${BASE_URI}api/users/register`, initialData)
        return res.data
      } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message })
      }
    }
  )

const registerSlice =createSlice({
    name:"register",
    initialState,
    reducer:{},// Add reducers for the synchronous actions on the UI[we are not using this property for this tutorial]
    // extraReducers:{
    //     [signup.fulfilled]: (state, action) => {
    //         // Add the new post created on the UI to the existing posts
    //         state.name=action.payload.name,
    //         state.mobile=action.payload.mobile,
    //         state.email=action.payload.email
    //     },   
    // },
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            state.name=action.payload.name,
            state.mobile=action.payload.mobile,
            state.email=action.payload.email
        })
      },
})
export default registerSlice.reducer
