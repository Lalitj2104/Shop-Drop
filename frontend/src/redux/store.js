import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
// import { retailerReducer } from "./Reducers/retailerReducer";

const store = configureStore({
	reducer: {
		userAuth: userReducer,
		// retailerAuth: retailerReducer,
	},
});

export default store;