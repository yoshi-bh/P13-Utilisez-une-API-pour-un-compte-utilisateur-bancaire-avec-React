import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../pages/Login/authSlice";
// import { thunk } from "redux-thunk";
// import { api } from "../services/authApi";

let state = {
	auth: {},
};

// const reducer = (currentState, action) => {
// 	switch (action.type) {
// 		case "LOGIN":
// 			return { ...currentState };
// 		case "LOGOUT":
// 			return { ...currentState };
// 		default:
// 			return currentState;
// 	}
// };

export const store = configureStore({
	preloadedState: state,
	reducer: combineReducers({
		auth: authSlice.reducer,
		// [api.reducerPath]: api.reducer,
	}),
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware().concat(api.middleware).concat(thunk),
});
