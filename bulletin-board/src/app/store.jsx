import { configureStore } from "@reduxjs/toolkit"
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

//store is syncronous, so to do some asynchonous stuff you need a thunk
//thunk is a coding term meaning "delayed work", use a redux thunk

export const store = configureStore({
   reducer: {
      posts: postsReducer,
      users: usersReducer
   }
})