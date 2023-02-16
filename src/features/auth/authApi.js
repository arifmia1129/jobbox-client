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
                    console.log(data);
                    dispatch(getUser(user?.email));
                } catch (error) {
                    // Nothing do
                }
            }
        })
    })
})

export const { useCrateUserMutation } = authApi;