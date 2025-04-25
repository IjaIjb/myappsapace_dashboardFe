import { createSlice } from '@reduxjs/toolkit';

const initialStore = localStorage.getItem("selectedStore") || null;
const initialCurrency = localStorage.getItem("selectedCurrency") || "NGN"; // Default to NGN

const stateSlice = createSlice({
    name: 'global/state',
    initialState: {
      // drawerOpen: false,
      cartData: null, // Set to `null` to handle undefined checks in the component.
      selectedStore: initialStore, // Store the selected store
      selectedCurrency: initialCurrency, // Store the selected currency
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
      setSelectedCurrency: (state, action) => {
        state.selectedCurrency = action.payload;
        localStorage.setItem("selectedCurrency", action.payload); // Persist in localStorage
      },
    },
  });

  export const {
    setCartData, 
    setSelectedStore,
    setSelectedCurrency
} = stateSlice.actions;

export default stateSlice.reducer;