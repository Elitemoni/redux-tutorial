import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'

const initialState = {
   posts: [],
   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
   error: null
}

const postSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      postAdd : {
         reducer(state, action) {
            state.posts.push(action.payload)
         },
         prepare(title, content) {
            return {
               paylod: {
                  id: nanoid(),
                  title,
                  content,
                  date: new Date().toISOString(),
                  reactions: {
                     thumbsUp: 0,
                     wow: 0,
                     heart: 0,
                     rocket: 0,
                     coffee: 0
                  }
               }
            }
         }
      }
   }
})

export const selectAllPosts = ((state) => state.posts.posts)
export const getPostStatus = ((state) => state.posts.status)
export const getPostError = ((state) => state.posts.error)

export const { postAdd } = postSlice.actions
export default postSlice.reducer