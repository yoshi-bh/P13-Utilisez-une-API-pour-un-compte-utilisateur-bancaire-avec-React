import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			firstName: "",
			lastName: "",
		},
	},
	reducers: {
		updateUser: (currentState, action) => {
			const user = {
				...currentState.user,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
			};
			return { ...currentState, user };
		},
		// logout: (currentState, action) => {
		// 	const user = { ...currentState.user, isConnected: false, token: "" };
		// 	return { ...currentState, user };
		// },
	},
});
