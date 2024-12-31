import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
// import { createStore } from 'redux';
 const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
// export default store;

// Initial state for the cart
const initialState = {
  cart: {
    items: [],  // Array to hold items in the cart
  },
};

// Action types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Reducer
// function cartReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_ITEM:
//       return {
//         ...state,
//         cart: {
//           items: [...state.cart.items, action.payload],
//         },
//       };
//     case REMOVE_ITEM:
//       return {
//         ...state,
//         cart: {
//           items: state.cart.items.filter(item => item.id !== action.payload),
//         },
//       };
//     case UPDATE_QUANTITY:
//       return {
//         ...state,
//         cart: {
//           items: state.cart.items.map(item => 
//             item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
//           ),
//         },
//       };
//     default:
//       return state;
//   }
// }

// Store
// const store = createStore(cartReducer);

// Update Quantity Action Creator
  export const updateQuantity = (id, quantity) => {
    return {
      type: UPDATE_QUANTITY,
      payload: { id, quantity },
    };
  };
  
  // Remove Item Action Creator
  export const removeItem = (id) => {
    return {
      type: REMOVE_ITEM,
      payload: id,
    };
  };
  

export default store;
