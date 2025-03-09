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
        logout: (state) => {
            state.value = {
                email: "",
                name:"",
                id: "",
                token:"",
                role:"",
                data:[]
            };
            localStorage.removeItem("token"); // Clear token from storage
          },
    },
});

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer