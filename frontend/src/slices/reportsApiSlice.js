import { REPORTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation({
      query: (data) => ({
        url: REPORTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reports'],
    }),
    getReports: builder.query({
      query: () => ({
        url: REPORTS_URL,
      }),
      providesTags: ['Reports'],
      keepUnusedDataFor: 5,
    }),
    deleteReport: builder.mutation({
      query: (reportId) => ({
        url: `${REPORTS_URL}/${reportId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reports'],
    }),
    resolveReport: builder.mutation({
      query: (reportId) => ({
        url: `${REPORTS_URL}/${reportId}/resolve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Reports'],
    }),
  }),
});

export const {
  useCreateReportMutation,
  useGetReportsQuery,
  useDeleteReportMutation,
  useResolveReportMutation,
} = reportsApiSlice;
