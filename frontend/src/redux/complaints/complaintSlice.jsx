import { createSlice } from "@reduxjs/toolkit" ;

const complaintSlice = createSlice({
    name: "complaint",
    initialState:{
        complaints:null,
        refresh:false,
        isActive:true,
    },
    reducers:{
        getAllComplaints:(state,action)=>{
            state.complaints=action.payload;
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh;
        },
        getIsActive:(state,action) => {
            state.isActive=false;
        }
    }
}) ;

export const {getAllComplaints,getRefresh,getIsActive} = complaintSlice.actions ;
export default complaintSlice.reducer ; 