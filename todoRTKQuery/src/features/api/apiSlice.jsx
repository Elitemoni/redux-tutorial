import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
   reducerPath: 'api', //default would be this if we excluded reducerPath
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
   tagTypes: ['Todos'],
   endpoints: (builder) => ({
      getTodos: builder.query({
         query: () => '/todos',
         transformResponse: res => res.sort((a,b) => b.id - a.id),
         providesTags: ['Todos']
      }),
      addTodo: builder.mutation({
         query: (todo) => ({
            url: '/todos',
            method: 'POST',
            body: todo
         }),
         invalidatesTags: ['Todos']
      }),
      updateTodo: builder.mutation({
         query: (todo) => ({
            url: `/todos/${todo.id}`,
            method: 'PATCH',
            body: todo
         }),
         invalidatesTags: ['Todos']
      }),
      deleteTodo: builder.mutation({
         query: ({ id }) => ({
            url: `/todos/${id}`,
            method: 'DELETE',
            body: id
         }),
         invalidatesTags: ['Todos']
      })
   })
})

//endpoints cache the data, but they don't fetch it

export const {
   useGetTodosQuery,
   useAddTodoMutation,
   useUpdateTodoMutation,
   useDeleteTodoMutation
} = apiSlice