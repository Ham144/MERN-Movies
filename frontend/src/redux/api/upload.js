import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const baseQuery = fetchBaseQuery({ baseUrl: UPLOADS_URL })

export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`,
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        }),
        deleteImage: builder.mutation({
            query: ({ path }) => ({
                url: `${UPLOADS_URL}/delete`,
                method: "DELETE",
                body: path,
            })
        })
    })
})

export const { useUploadImageMutation, useDeleteImageMutation } = uploadApiSlice