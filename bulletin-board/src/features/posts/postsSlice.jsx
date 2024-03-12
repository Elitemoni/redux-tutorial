import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

//static state
/* const initialState = [
   { 
      id: '1', 
      title: 'Learning Redux Toolkit', 
      content: "I've heard good things.",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
         thumbsUp: 0,
         wow: 0,
         heart: 0,
         rocket: 0,
         coffee: 0
      }
   },
   { 
      id: '2', 
      title: 'Slices...', 
      content: "The more I say slice, the more I want pizza.",
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {
         thumbsUp: 0,
         wow: 0,
         heart: 0,
         rocket: 0,
         coffee: 0
      }
   }
] */

const initialState = {
   posts: [],
   status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
   error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
   try {
      const response = await axios.get(POSTS_URL)
      return [...response.data]
   } catch (err) {
      return err.message
   }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
   try {
      const response = await axios.post(POSTS_URL, initialPost)
      return response.data
   } catch (err) {
      return err.message
   }
})

//in only createSlice, reduxjs/toolkit uses immer js under the hood, so instead of having to return an object like this {...state, action.payload}, we can just push it. It still creates a new object that replaces the immutable state in store

const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      postAdded: { 
         reducer(state, action) {
            state.posts.push(action.payload)
         },
         //prepare returns what is passed to the reducer
         prepare(title, content, userId) {
            return {
               payload: {
                  id: nanoid(),
                  title,
                  content,
                  date: new Date().toISOString(),
                  userId,
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
      },
      reactionAdded(state, action) {
         const { postId, reaction } = action.payload
         const post = state.posts.find(post => post.id === postId)
         if (post){
            post.reactions[reaction]++
         }
      }
   },
   extraReducers(builder) {
      builder
         .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1
            const loadedPosts = action.payload.map(post => {
               post.date = sub(new Date(), { minutes: min++ }).toISOString()
               post.reactions = {
                  thumbsUp: 0,
                  wow: 0,
                  heart: 0,
                  rocket: 0, 
                  coffee: 0
               }
               return post
            })

            // add any fetched posts to the array
            // concat works with immer js, which again allows you to write code as if you're mutating the state when you're really not under the hood
            state.posts = state.posts.concat(loadedPosts)
         })
         .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
         .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString()
            action.payload.reactions = {
               thumbsUp: 0,
               wow: 0,
               heart: 0,
               rocket: 0,
               coffee: 0
            }
            state.posts.push(action.payload)
         })
   }
})

export const selectAllPosts = ((state) => state.posts.posts)
export const getPostsStatus = ((state) => state.posts.status)
export const getPostsError = ((state) => state.posts.error)

export const { postAdded, reactionAdded } = postsSlice.actions
export default postsSlice.reducer