import { apiClient } from "@/app/api-client";

export const statusProgressApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getStatusTracker: builder.query({
      query: (token) => ({
        url: `/api/v2/status-tracker`,
        method: "GET",
        params: { token }, 
      }),
      providesTags: ["status_tracker"],
    }),
  }),
});

export const { useGetStatusTrackerQuery } = statusProgressApi;
