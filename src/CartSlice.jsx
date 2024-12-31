import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // { name: 'Plant Name', cost: 15, quantity: 1 }, // Ensure cost is always present
  ],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increment quantity
      } else {
        state.items.push(action.payload); // Add new item with quantity
        console.log('Added new item:', action.payload);
      }
    },
       
    removeItem: (state, action) => {
      // if (action.payload) {
        state.items = state.items.filter(item => item.name !== action.payload);
        console.log('Removed item:', action.payload);
        console.log('Current state items:', state.items);
      // }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
        console.log('Updated item quantity:', item);
      }
      console.log('Current state items:', state.items);
    },
    //extra
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.name === action.payload);
      if (item) {
        item.quantity += 1;
      }
      console.log('Incremented item quantity:', item);
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    
  },
});

// export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const { addItem, removeItem, updateQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
