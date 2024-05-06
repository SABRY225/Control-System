import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id:'',
};


const authSlice = createSlice({
    name: 'IdProfile',
    initialState,
    reducers: {

        setId: (state, { payload }) => {
            state.firstName = payload;
        },
    }
});

export const {setId } = authSlice.actions;
export default authSlice.reducer;