import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './feature/cart/CartSlice'
import booksApi from "./feature/book/bookApi";
import ordersApi from "./feature/order/orderApi";

export const store = configureStore({
    reducer: {
        cart: cartReducer, // Add other reducers here if needed.
        [booksApi.reducerPath]: booksApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
})
  