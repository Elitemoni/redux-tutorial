import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
   reducerPath: 'api', // optional
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500 '}),
   tagTypes: ['Post'],
   endpoints: builder => ({}) // need to include even if it does nothing. InjectEndpoints needs this to be declared
})
