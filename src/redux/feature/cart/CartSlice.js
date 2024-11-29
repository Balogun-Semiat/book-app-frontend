import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
   cartItems : [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
       addToCart:(state, action)=>{
        const existingItem = state.cartItems.find(item => item._id === action.payload._id);
        if(!existingItem){
            state.cartItems.push(action.payload);
            // alert("Item has been added to cart");
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item has been added to cart",
                showConfirmButton: false,
                timer: 1500
              });
        }else{
            Swal.fire({
                icon: "warning",
                title: "Already added to cart!",
                text: "Add another item",
              });
        }
       },
       removeFromCart:(state, action)=>{
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
       },
       clearCart:(state, action)=>{
        state.cartItems = [];
       }
    },
})

//export our actions

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

//export our slice
export default cartSlice.reducer;