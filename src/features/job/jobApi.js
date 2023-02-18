import { apiSlice } from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createJob: build.mutation({
            query: (job) => ({
                method: "POST",
                url: "/api/job",
                body: job
            }),
            invalidatesTags: ["Job"]
        }),
        applyToJob: build.mutation({
            query: (applyInfo) => ({
                method: "POST",
                url: "/api/job/apply",
                body: applyInfo
            })
        }),
        query: build.mutation({
            query: (query) => ({
                method: "POST",
                url: "/api/job/query",
                body: query
            }),
            invalidatesTags: ["Query"]
        }),
        reply: build.mutation({
            query: (query) => ({
                method: "POST",
                url: "/api/job/reply",
                body: query
            }),
            invalidatesTags: ["Query"]
        }),
        getJobs: build.query({
            query: () => ({
                url: "/api/job"
            }),
            providesTags: ["Job"]
        }),
        getJobById: build.query({
            query: (id) => ({
                url: `/api/job/${id}`
            }),
            providesTags: ["Query"]
        }),
        getAppliedJobs: build.query({
            query: (email) => ({
                url: `/api/job/applied/${email}`
            })
        }),
    })
})

export const { useCreateJobMutation, useGetJobsQuery, useGetJobByIdQuery, useApplyToJobMutation, useGetAppliedJobsQuery, useQueryMutation, useReplyMutation } = jobApi;