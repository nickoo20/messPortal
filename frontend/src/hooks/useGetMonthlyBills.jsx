import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyBills } from "../redux/bill/billSlice";
import { useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useGetMonthlyBills = () => {
    const dispatch = useDispatch() ;
    const { currentUser } = useSelector(state=>state.user) ;
    const { refresh } = useSelector(state=>state.complaint) ;

    const fetchMonthlyBills = async () => {
        try {
            const res = await axios.post(
              `${BACKEND_URL}/api/bills/${currentUser.registrationNumber}`,
              { month, year },
              { withCredentials: true }
            ); 
            console.log('monthlyBills: ',res?.data) ;
            dispatch(getMonthlyBills(res?.data.data)) ;
          } catch (error) {
            console.error("Error fetching bill:", error);
          }
    };

    useEffect(()=>{
        fetchMonthlyBills() ;
    },[refresh]) ;
}
