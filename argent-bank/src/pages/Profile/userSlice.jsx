import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserThunk = createAsyncThunk(
	"profile/getUserThunk",
	async (token) => {
		return await (async () => {
			const response = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
				}
			);
			return await response.json();
		})();
	}
);

export const updateUserThunk = createAsyncThunk(
	"profile/updateUserThunk",
	async ({ token, firstName, lastName }) => {
		return await (async () => {
			const response = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					body: JSON.stringify({
						firstName,
						lastName,
					}),
				}
			);
			return await response.json();
		})();
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			firstName: "",
			lastName: "",
		},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserThunk.fulfilled, (currentState, action) => {
			const user = {
				...currentState.user,
				firstName: action.payload.body.firstName,
				lastName: action.payload.body.lastName,
			};
			return { ...currentState, user };
		});
		builder.addCase(updateUserThunk.fulfilled, (currentState, action) => {
			return { ...currentState };
		});
	},
});
