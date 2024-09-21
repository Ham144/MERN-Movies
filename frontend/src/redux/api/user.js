
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersQuery = fetchBaseQuery({
    baseUrl: USERS_URL
})

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "DELETE",
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update/${data.username}`,
                method: "PATCH",
                body: data
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`
            })
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation, useGetAllUsersQuery } = userApiSlice;
