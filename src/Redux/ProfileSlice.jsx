import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id:'',
    Fid:'',
    IdControl:' ',
    IdControlRecord:' ',
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
        setIdControl: (state, { payload }) => {
            state.IdControl = payload;
        },
        setIdControlRecord: (state, { payload }) => {
            state.IdControlRecord = payload;
        },
    }
});

export const {setId ,setFid,setIdControl,setIdControlRecord} = profileSlice.actions;
export default profileSlice.reducer;