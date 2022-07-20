import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4006/api/' }),
  endpoints: (builder) => ({
    getEmployee: builder.query({
      providesTags: ['emp-list'],
      query: () => `employee`,
    }),
    createEmployee: builder.mutation({
      invalidatesTags: ['emp-list'],
      query: payload => ({
        url: 'employee',
        method: 'POST',
        body: payload

      })
    }),
    updateEmployee: builder.mutation({
      invalidatesTags: ['emp-list'],
      query: payload => ({
        url: `employee/${payload.id}`,
        method: 'PUT',
        body: payload.body

      })
    }),
    deleteEmployee:builder.mutation({
      invalidatesTags: ['emp-list'],
      query: id=>({
        url:`employee/${id}`,
        method: 'DELETE'
      })
    }),
    getEmployeeById: builder.query({
      // providesTags:['emp-list'],
      query:id=>({
        url:`employee/${id}`,
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEmployeeQuery, useCreateEmployeeMutation,useUpdateEmployeeMutation, useDeleteEmployeeMutation, useGetEmployeeByIdQuery } = employeeApi