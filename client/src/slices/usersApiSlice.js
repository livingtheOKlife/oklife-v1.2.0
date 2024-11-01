import { apiSlice } from './apiSlice'

const USERS_URL = '/api/auth'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useLogoutMutation } = usersApiSlice
