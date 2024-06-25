import { createSlice} from "@reduxjs/toolkit" ;

const initialState = {
    user : null ,
    error: null,
    loading: false,
    isLoggedIn:false,
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
          loginAdmin(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
          },
          logoutAdmin(state) {
            state.user = null;
            state.isLoggedIn = false;
          },
    }
}) ;
export const {
    signInFailure,
    signInStart,
    signInSuccess,
    signOutAdminFailure,
    signOutAdminStart,
    signOutAdminSuccess,
    deleteAdminFailure,
    deleteAdminSuccess,
    deleteAdminStart,
    updateAdminFailure,
    updateAdminStart,
    updateAdminSuccess,
    loginAdmin,
    logoutAdmin,
} = adminSlice.actions; 
export default adminSlice.reducer;  