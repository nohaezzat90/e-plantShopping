import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const numericCost = typeof cost === "string" 
        ? parseFloat(cost.replace(/[^0-9.]/g, "")) 
        : cost;

        if (isNaN(numericCost)) {
            console.error("Invalid cost:", cost);  // Debugging
            return;  // Prevent adding invalid items
        }

        const existingItem = state.items.find(item => item.name === name)
        
        
        if (existingItem) {
            existingItem.quantity += 1;
        }else{
            state.items.push({name, image, cost: numericCost, quantity: 1});
        }
        console.log("Updated Cart:", state.items);

    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
              itemToUpdate.quantity = quantity ;
            }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
