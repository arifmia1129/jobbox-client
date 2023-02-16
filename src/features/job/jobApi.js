import { apiSlice } from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createJob: build.mutation({
            query: (job) => ({
                method: "POST",
                url: "/api/job",
                body: job
            })
        }),
        getJobs: build.query({
            query: () => ({
                url: "/api/job"
            })
        }),
        getJobById: build.query({
            query: (id) => ({
                url: `/api/job/${id}`
            })
        }),
    })
})

export const { useCreateJobMutation, useGetJobsQuery, useGetJobByIdQuery } = jobApi;