import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  controls: [],
  selectedSubjects: [],
};

const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    addControl(state, action) {
      state.controls.push(action.payload);
    },
    addSelectedSubject(state, action) {
      state.selectedSubjects.push(action.payload);
    },
    removeSelectedSubject(state, action) {
      state.selectedSubjects = state.selectedSubjects.filter(
        (subject) => subject !== action.payload
      );
    },
    clearSelectedSubjects(state) {
      state.selectedSubjects = [];
    },
  },
});

export const {
  addControl,
  addSelectedSubject,
  removeSelectedSubject,
  clearSelectedSubjects,
} = controlSlice.actions;

export default controlSlice.reducer;
