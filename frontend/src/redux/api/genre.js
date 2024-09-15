import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { GENRES_URL } from "../constants.js"
import { apiSlice } from "./apiSlice.js"

const baseQuery = fetchBaseQuery({ baseUrl: GENRES_URL })

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGenre: builder.mutation({
            query: (data) => ({
                url: `${GENRES_URL}`,
                method: "POST",
                body: data
            })
        }),
        deleteGenre: builder.mutation({
            query: (data) => ({
                url: `${GENRES_URL}/${data.id}`,
                method: "DELETE",
            })
        }),
        updateGenre: builder.mutation({
            query: (data) => ({
                url: `${GENRES_URL}/${data.id}`,
                method: "PUT",
                body: data
            })
        }),
        getAllGenre: builder.query({
            query: () => ({
                url: `${GENRES_URL}`,
                method: "GET",
            })
        })
    })
})

export const { useCreateGenreMutation, useDeleteGenreMutation, useUpdateGenreMutation, useGetAllGenreQuery } = genreApiSlice