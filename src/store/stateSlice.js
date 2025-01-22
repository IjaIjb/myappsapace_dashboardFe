import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
    name: 'global/state',
    initialState: {
      // drawerOpen: false,
      cartData: null, // Set to `null` to handle undefined checks in the component.
      // modalType: '',

    },
  
    reducers: {
      setCartData: (state, action) => {
        state.cartData = action.payload;
      },
   
    },
  });

  export const {
    setCartData

} = stateSlice.actions;

export default stateSlice.reducer;
