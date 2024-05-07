import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faculty: "",
  control: "",
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      const { control, faculty } = action.payload;
      state.control = control;
      state.faculty = faculty;
    },
  },
});

export const { setDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
