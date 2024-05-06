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
        isHeadControl: (state) => {
            state.role = 'HeadControl';
        },
        isMemberControl: (state) => {
            state.role = 'MemberControl';
        },
        setName: (state, { payload }) => {
            state.firstName = payload;
        },
    }
});

export const { loginSuccess, logoutSuccess,isAdminUniversity, isAdminFaculty,isHeadControl, isMemberControl, setName } = authSlice.actions;
export default authSlice.reducer;