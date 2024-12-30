import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
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
      }
    },
       
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    //extra
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.name === action.payload);
      if (item) {
        item.quantity += 1;
      }
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
