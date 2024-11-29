// USING RTK QUERY FROM REDUX
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})


// Define a new slice for handling API requests
const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder)=>({
        fetchAllBooks: builder.query({
            query: () => '/',
            providesTags: ['Books']
        }),
        fetchSingleBook: builder.query({ 
            query: (id) => `/${id}`,
            providesTags: ( result, error, id ) => [{type: 'Books', id}]
        }),
        createBook: builder.mutation({
            query: (newBook) => ({ 
                url: '/create-book',
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`, 
                method: 'DELETE',
            }),
            invalidatesTags: ['Books']
        })
    })
})



export const {useFetchAllBooksQuery, 
    useFetchSingleBookQuery, 
    useCreateBookMutation, 
    useUpdateBookMutation, 
    useDeleteBookMutation
} = booksApi;

export default booksApi;