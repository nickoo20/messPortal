import {createSlice, current} from '@reduxjs/toolkit'; 

const initialState={
    currentUser:null,
    error:null,
    loading:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutUserStart:(state)=>{
            state.loading=false;
        },
        signOutUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        },
        signOutUserFailure:(state, action)=>{
            state.error=action.payload
            state.loading=false;
        }
    }
})
export const {signInFailure,signInStart,signInSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess} = userSlice.actions;
export default userSlice.reducer ;