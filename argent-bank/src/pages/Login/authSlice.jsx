import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		auth: {
			isConnected: false,
			token: "",
		},
	},
	reducers: {
		login: (currentState, action) => {
			const auth = {
				...currentState.auth,
				isConnected: true,
				token: action.payload,
			};
			return { ...currentState, auth };
		},
		logout: (currentState, action) => {
			const auth = { ...currentState.auth, isConnected: false, token: "" };
			return { ...currentState, auth };
		},
	},
});
