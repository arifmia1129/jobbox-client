import { apiSlice } from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        crateUser: build.mutation({
            query: (user) => ({
                method: "POST",
                url: "/api/user",
                body: user
            })
        })
    })
})

export const { useCrateUserMutation } = authApi;