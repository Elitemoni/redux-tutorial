// store stores the entire object state of the app in an immutable object tree

import { configureStore } from "@reduxjs/toolkit"
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
   reducer: {
      counter: counterReducer,
   }
})
