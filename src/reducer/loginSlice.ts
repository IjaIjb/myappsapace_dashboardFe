import {createSlice} from '@reduxjs/toolkit';

const initialStateValue = {
    email: "",
    name:"",
    id: "",
    token:"",
    role:"",
    data:[]
}

const loginSlice = createSlice({
    name: 'Login',
    initialState: {
        value: initialStateValue,
    },

    reducers: {
        login : (state,action) =>{
            state.value = action.payload;
        },
    },
});

export const {login} = loginSlice.actions

export default loginSlice.reducer