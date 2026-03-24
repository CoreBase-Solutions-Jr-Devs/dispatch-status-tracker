import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiClient = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
            const accessKey = import.meta.env.VITE_CLIENT_ACCESS_KEY;
      if (accessKey) headers.set('accesskey', accessKey);
      headers.set('accept', 'text/plain');
      return headers;
    },
  }),
  tagTypes: ['status_tracker'],
  endpoints: () => ({}),
});