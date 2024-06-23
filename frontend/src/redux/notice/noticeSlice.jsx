import { createSlice } from "@reduxjs/toolkit";

const noticeSlice = createSlice({
    name: "notice",
    initialState: {
        allNotices: null,
        refresh: false,
    },
    reducers: {
        getAllNotices: (state, action) => {
            state.allNotices = action.payload;
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh;
        },
    }
});

export const { getAllNotices, getRefresh } = noticeSlice.actions;
export default noticeSlice.reducer; 

