import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { retailerReducer } from "./Reducers/retailerReducer";
import { productReducer } from "./Reducers/productReducer";

const store = configureStore({
	reducer: {
		userAuth: userReducer,
		retailerAuth: retailerReducer,
		productAuth:productReducer,
		
	},
});

export default store;