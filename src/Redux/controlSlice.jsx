import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  controls: [{
      selectedAcademicYear:'السنة الاولي',
      chairpersons:["د / عماد"],
      term:'الفصل الدراسي الاول',
      academicYear:'23/24'
    },
    {
      selectedAcademicYear:'السنة الاولي',
      chairpersons:["د / عماد"],
      term:'الفصل الدراسي الاول',
      academicYear:'23/24'
    },
    {
      selectedAcademicYear:'السنة الاولي',
      chairpersons:["د / عماد"],
      term:'الفصل الدراسي الاول',
      academicYear:'23/24'
    },
    {
      selectedAcademicYear:'السنة الاولي',
      chairpersons:["د / عماد"],
      term:'الفصل الدراسي الاول',
      academicYear:'23/24'
    },],
  selectedSubjects: [],
  selectedChairpersons: [],
  selectedCommitteeMembers: [],
  controlDetails: {
    controlName: '',
    academicYear: '23/24',
    term: 'الترم الاول',
    startDate: '',
    endDate: '',
    selectedSubject: '',
    selectedAcademicYear: '',
    includeMajor: false,
    selectedMajor: '',
  },
};

const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    addControl(state, action) {
      state.controls.push(action.payload);
    },
    removeControl(state, action) {
      const controlToRemove = action.payload;
      state.controls = state.controls.filter(control => control.id !== action.controlToRemove);
    },
    addSelectedSubject(state, action) {
      state.selectedSubjects.push(action.payload);
    },
    removeSelectedSubject(state, action) {
      state.selectedSubjects = state.selectedSubjects.filter((subject) => subject !== action.payload);
    },
    clearSelectedSubjects(state) {
      state.selectedSubjects = [];
    },
    addSelectedChairperson(state, action) {
      state.selectedChairpersons.push(action.payload);
    },
    removeSelectedChairperson(state, action) {
      state.selectedChairpersons = state.selectedChairpersons.filter((chairperson) => chairperson !== action.payload);
    },
    clearSelectedChairpersons(state) {
      state.selectedChairpersons = [];
    },
    addSelectedCommitteeMember(state, action) {
      state.selectedCommitteeMembers.push(action.payload);
    },
    removeSelectedCommitteeMember(state, action) {
      state.selectedCommitteeMembers = state.selectedCommitteeMembers.filter(
        (committeeMember) => committeeMember !== action.payload
      );
    },
    clearSelectedCommitteeMembers(state) {
      state.selectedCommitteeMembers = [];
    },
    updateControlDetails(state, action) {
      state.controlDetails = { ...state.controlDetails, ...action.payload };
    },
    clearControlDetails(state) {
      state.controlDetails = {
        controlName: '',
        academicYear: '',
        term: '',
        startDate: '',
        endDate: '',
        selectedSubject: '',
        selectedAcademicYear: '',
        includeMajor: false,
        selectedMajor: '',
      };
    },
    // Additional reducers can be added here
  },
});

export const {
  addControl,
  removeControl,
  addSelectedSubject,
  removeSelectedSubject,
  clearSelectedSubjects,
  addSelectedChairperson,
  removeSelectedChairperson,
  clearSelectedChairpersons,
  addSelectedCommitteeMember,
  removeSelectedCommitteeMember,
  clearSelectedCommitteeMembers,
  updateControlDetails,
  clearControlDetails,
} = controlSlice.actions;

export default controlSlice.reducer;
