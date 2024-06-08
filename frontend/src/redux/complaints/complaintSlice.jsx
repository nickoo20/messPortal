import { createSlice } from "@reduxjs/toolkit" ;

const complaintSlice = createSlice({
    name: "complaint",
    initialState:{
        allComplaints:null,
        myComplaints:null,
        refresh:false,
        isActive:true,
        comments:null,
    },
    reducers:{
        getAllComplaints:(state,action)=>{
            state.allComplaints=action.payload;
        },
        getMyComplaints:(state,action)=>{
            state.myComplaints = action.payload ;
        },
        getAllComments:(state,action)=>{
            state.comments = action.payload ;
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh;
        },
        getIsActive:(state,action) => {
            state.isActive=false;
        }
    }
}) ;

export const {getAllComplaints,getMyComplaints, getAllComments, getRefresh,getIsActive} = complaintSlice.actions ;
export default complaintSlice.reducer ; 