import { apiSlice } from "../api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        crateUser: build.mutation({
            query: (user) => ({
                method: "POST",
                url: "/api/user",
                body: user
            }),
            async onQueryStarted(user, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(getUser(user?.email));
                } catch (error) {
                    // Nothing do
                }
            }
        }),
        getUserByEmail: build.query({
            query: (email) => ({
                url: `/api/user/${email}`
            })
        })
    })
})

export const { useCrateUserMutation, useGetUserByEmailQuery } = authApi;