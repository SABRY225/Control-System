import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id:'',
    Fid:''
};


const profileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {

        setId: (state, { payload }) => {
            state.id = payload;
        },
        setFid: (state, { payload }) => {
            state.Fid = payload;
        },
    }
});

export const {setId ,setFid} = profileSlice.actions;
export default profileSlice.reducer;