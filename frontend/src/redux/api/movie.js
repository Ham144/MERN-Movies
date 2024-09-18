import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiSlice } from "./apiSlice"
import { MOVIES_URL } from "../constants"

const baseQuery = fetchBaseQuery({ baseUrl: MOVIES_URL })

export const movieApislice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}`
            })
        }),
        getSingleMovie: builder.query({
            query: ({ id }) => ({
                url: `${MOVIES_URL}/${id}`
            })
        }),
        getRandomMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/get/random`
            })
        }),
        getHypeMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/get/hypemovies`
            })
        }),
        getLatestMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/get/latest`
            })
        }),
        createReview: builder.mutation({
            query: ({ movieId, data }) => ({
                url: `${MOVIES_URL}/${movieId}/reviews`,
                method: "POST",
                body: data
            })
        }),
        createMovie: builder.mutation({
            query: (data) => ({
                url: `${MOVIES_URL}`,
                method: "POST",
                body: data
            })
        }),
        deleteMovie: builder.mutation({
            query: ({ id }) => ({
                url: `${MOVIES_URL}/delete/${id}`,
                method: "DELETE",
            })
        }),
        editMovie: builder.mutation({
            query: ({ id, data }) => ({
                url: `${MOVIES_URL}/edit/${id}`,
                method: "PUT",
                body: data
            })
        }),
        deleteReview: builder.mutation({
            query: ({ movieId, id }) => ({
                url: `${MOVIES_URL}/${movieId}/reviews/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useGetAllMoviesQuery, useGetSingleMovieQuery, useGetRandomMoviesQuery, useGetHypeMoviesQuery, useCreateMovieMutation, useDeleteMovieMutation, useGetLatestMoviesQuery, useEditMovieMutation, useCreateReviewMutation, useDeleteReviewMutation } = movieApislice