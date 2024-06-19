import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaints } from "../redux/complaints/complaintSlice";
import { useEffect } from "react";

const useGetAllComplaints = () => {
    const dispatch = useDispatch() ;
    const { refresh } = useSelector(state=>state.complaint) ;

    const fetchAllComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/complaints/all",{
          withCredentials:true,
        });
        console.log(res) ;
        dispatch(getAllComplaints(res?.data.complaints)) ;
        // setComplaints(res?.data.comp1); // Assuming res.data is an array of complaints
      } catch (err) {
        console.error("Error fetching complaints:", err.message);
      }
    };

    // fetchAllComplaints() ; 

    useEffect(()=>{
        fetchAllComplaints() ;
    },[refresh]) ;
}

export default useGetAllComplaints;