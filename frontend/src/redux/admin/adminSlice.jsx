import { createSlice} from "@reduxjs/toolkit" ;

const initialState = {
    user : null ,
    error: null,
    loading: false,
} ; 

const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true ;
        },
        signInSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
          },
          signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          signOutAdminStart: (state) => {
            state.loading = false;
          },
          signOutAdminSuccess: (state) => {
            state.user = null;
            state.loading = false;
            state.error = false;
          },
          signOutAdminFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          deleteAdminStart: (state) => {
            state.loading = true;
          },
          deleteAdminSuccess: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = null;
          },
          deleteAdminFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          updateAdminStart: (state) => {
            state.loading = true;
          },
          updateAdminSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateAdminFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
    }
}) ;
export const {
    signInFailure,
    signInStart,
    signInSuccess,
    signOutUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    deleteUserFailure,
    deleteUserSuccess,
    deleteUserStart,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} = adminSlice.actions; 
export default adminSlice.reducer;  