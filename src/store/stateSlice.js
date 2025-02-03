import { createSlice } from '@reduxjs/toolkit';

const initialStore = localStorage.getItem("selectedStore") || null;

const stateSlice = createSlice({
    name: 'global/state',
    initialState: {
      // drawerOpen: false,
      cartData: null, // Set to `null` to handle undefined checks in the component.
      selectedStore: initialStore, // Store the selected store
      // modalType: '',

    },
  
    reducers: {
      setCartData: (state, action) => {
        state.cartData = action.payload;
      },
      setSelectedStore: (state, action) => {
        state.selectedStore = action.payload;
        localStorage.setItem("selectedStore", action.payload); // Persist in localStorage
      },
   
    },
  });

  export const {
    setCartData, 
    setSelectedStore 
} = stateSlice.actions;

export default stateSlice.reducer;
