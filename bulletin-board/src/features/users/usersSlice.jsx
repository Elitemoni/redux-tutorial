import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchPosts', async () => {
   try {
      const response = await axios.get(USERS_URL)
      //return [...response.data]
      return response.data
   } catch (err) {
      return err.message
   }
})

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
         return action.payload //replace user state completely
         // return state.users.push(...state, action.payload)
      })
   }
})

export const selectAllUsers = (state) => state.users
export default usersSlice.reducer