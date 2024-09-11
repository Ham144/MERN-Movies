
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersQuery = fetchBaseQuery({
    baseUrl: USERS_URL
})

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            })
        })
    }
})

export const { useLoginMutation } = userApiSlice;
