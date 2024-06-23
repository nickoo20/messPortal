import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyBills } from "../redux/bill/billSlice";
import { useEffect } from "react";

export const useGetMonthlyBills = () => {
    const dispatch = useDispatch() ;
    const { currentUser } = useSelector(state=>state.user) ;
    const { refresh } = useSelector(state=>state.complaint) ;

    const fetchMonthlyBills = async () => {
        try {
            const res = await axios.post(
              `http://localhost:8080/api/bills/${currentUser.registrationNumber}`,
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
