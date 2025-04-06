import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotices } from "../redux/notice/noticeSlice";
import { useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useGetAllNotices = () => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(state => state.notice);

    const fetchAllNotices = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/notice`, {
                withCredentials: true,
            });
            console.log(res?.data);
            dispatch(getAllNotices(res?.data.notices));
        } catch (error) {
            console.log("Error fetching notices");
        }
    };
    useEffect(() => {
        fetchAllNotices();
    }, [refresh]);

}
