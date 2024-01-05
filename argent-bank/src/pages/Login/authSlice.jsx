import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
	"auth/loginThunk",
	async ({ email, password }) => {
		return await (async () => {
			const response = await fetch("http://localhost:3001/api/v1/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			return await response.json();
		})();
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		auth: {
			isConnected: false,
			token: "",
		},
	},
	reducers: {
		logout: (currentState, action) => {
			const auth = { ...currentState.auth, isConnected: false, token: "" };
			return { ...currentState, auth };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginThunk.fulfilled, (currentState, action) => {
			const auth = {
				...currentState.auth,
				isConnected: true,
				token: action.payload.body.token,
			};
			return { ...currentState, auth };
		});
	},
});
