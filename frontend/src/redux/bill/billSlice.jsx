import { createSlice } from "@reduxjs/toolkit" ;

const billSlice = createSlice({
    name: "bill",
    initialState:{
        monthlyBills:null,
        billData: null,
        bills:null,
        // myComplaints:null,
        refresh:false,
    },
    reducers:{
        getMonthlyBills:(state,action)=>{
            state.monthlyBills=action.payload;
        },
        // getMyComplaints:(state,action)=>{
        //     state.myComplaints = action.payload ;
        // },
        // getAllComments:(state,action)=>{
        //     state.comments = action.payload ;
        // },
        setBillData:(state,action)=>{
            state.billData=action.payload;
        },
        setBills: (state, action) => {
            state.bills = action.payload;
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh;
        },
    }
}) ;

export const {getMonthlyBills, setBillData, setBills, getRefresh } = billSlice.actions ;
export default billSlice.reducer ; 