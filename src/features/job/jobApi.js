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
        toggleJobStatus: build.mutation({
            query: (statusInfo) => ({
                method: "POST",
                url: "/api/job/status",
                body: statusInfo
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
        sendMessage: build.mutation({
            query: (message) => ({
                method: "POST",
                url: "/api/job/message",
                body: message
            }),
            invalidatesTags: ["Query"]
        }),
        replyToMessage: build.mutation({
            query: (replyMessage) => ({
                method: "POST",
                url: "/api/job/reply-message",
                body: replyMessage
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
        getJobsByEmail: build.query({
            query: (email) => ({
                url: `/api/job/employer/${email}`
            }),
            providesTags: ["Query"]
        }),
        getAppliedJobs: build.query({
            query: ({ email, sort }) => ({
                url: `/api/job/applied/${email}/${sort}`
            })
        }),
    })
})

export const { useCreateJobMutation, useGetJobsQuery, useGetJobByIdQuery, useApplyToJobMutation, useGetAppliedJobsQuery, useQueryMutation, useReplyMutation, useToggleJobStatusMutation, useGetJobsByEmailQuery, useSendMessageMutation, useReplyToMessageMutation } = jobApi;