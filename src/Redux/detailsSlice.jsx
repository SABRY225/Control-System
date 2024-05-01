import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  year: '',
  committeeName: '',
  committeeNickname: '',
  status: '',
  faculty: '',
  semester: '',
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      const { year, committeeName, committeeNickname, status, faculty, semester } = action.payload;
      state.year = year;
      state.committeeName = committeeName;
      state.committeeNickname = committeeNickname;
      state.status = status;
      state.faculty = faculty;
      state.semester = semester;
    },
  },
});

export const { setDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
