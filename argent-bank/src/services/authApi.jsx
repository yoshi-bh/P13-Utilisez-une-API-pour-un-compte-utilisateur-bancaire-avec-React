import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1/" }),
	endpoints: (builder) => ({
		getToken: builder.query({
			query: () => ({
				url: `/login`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: "tony@stark.com",
					password: "password123",
				}),
			}),
		}),
	}),
});

export const { useGetTokenQuery } = api;
