import {createSlice} from '@reduxjs/toolkit';

const initialStateValue = {
    name: "",
    price: "",
    img1:"",
    img2:""
}

const houseSlice = createSlice({
    name: 'Houses',
    initialState: {
        value: initialStateValue,
    },

    reducers: {
        houses : (state,action) =>{
            state.value = action.payload;
        },
    },
});

export const {houses} = houseSlice.actions

export default houseSlice.reducer