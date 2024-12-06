import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { retailerReducer } from "./Reducers/retailerReducer";
import { productReducer } from "./Reducers/productReducer";
import {cartReducer} from "./Reducers/cartReducer"
import {orderReducer} from "./Reducers/orderReducer"
import {wishListReducer} from "./Reducers/wishListReducer"
import {reviewReducer} from "./Reducers/reviewReducer"

const store = configureStore({
	reducer: {
		userAuth: userReducer,
		retailerAuth: retailerReducer,
		productAuth:productReducer,
		cartAuth:cartReducer,
		orderAuth:orderReducer,
		wishListAuth:wishListReducer,
		reviewAuth:reviewReducer,
		
	},
});

export default store;