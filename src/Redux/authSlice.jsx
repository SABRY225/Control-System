import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    role: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
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
        setName: (state, { payload }) => {
            state.firstName = payload;
        },
    }
});

export const { loginSuccess, logoutSuccess,isAdminUniversity, isAdminFaculty,isStaff, setName } = authSlice.actions;
export default authSlice.reducer;