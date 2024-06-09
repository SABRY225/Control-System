import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id:'',
    Fid:'',
    IdControl:' ',
    IdControlRecord:' ',
    national: '',
    firstName: '',
    college: '',
    email: '',
    userImage:''
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
        setName: (state, { payload }) => {
            state.firstName = payload;
        },
        setNationalID: (state, { payload }) => {
            state.national = payload;
        },
        setCollege: (state, { payload }) => {
            state.college = payload;
        },
        setEmail: (state, { payload }) => {
            state.email = payload;
        },
        setUserImage: (state, { payload }) => {
            state.userImage = payload;
        },
        setIdControl: (state, { payload }) => {
            state.IdControl = payload;
        },
        setIdControlRecord: (state, { payload }) => {
            state.IdControlRecord = payload;
        },
    }
});

export const {setId ,setFid,setIdControl,setIdControlRecord,setName,setNationalID,setCollege,setEmail,setUserImage} = profileSlice.actions;
export default profileSlice.reducer;