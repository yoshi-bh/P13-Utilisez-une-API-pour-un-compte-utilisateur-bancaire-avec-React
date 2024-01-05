import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../pages/Login/authSlice";
import { userSlice } from "../pages/Profile/userSlice";

let state = {
	auth: {},
};

export const store = configureStore({
	preloadedState: state,
	reducer: combineReducers({
		auth: authSlice.reducer,
		user: userSlice.reducer,
	}),
});
