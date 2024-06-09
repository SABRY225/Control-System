import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    role: '',
    email:' ',

};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state,{ payload }) => {
            state.token = payload;
        },
        logoutSuccess: (state) => {
            state.token = '';
        },
        isAdminUniversity: (state) => {
            state.role = 'AdminUniversity';
        },
        isAdminFaculty: (state) => {
            state.role = 'AdminFaculty';
        },
        isStaff: (state) => {
            state.role = 'Staff';
        },
        setEmail: (state,{ payload }) => {
            state.email = payload;
        },
    }
});

export const { loginSuccess, logoutSuccess,isAdminUniversity, isAdminFaculty,isStaff,setEmail } = authSlice.actions;
export default authSlice.reducer;