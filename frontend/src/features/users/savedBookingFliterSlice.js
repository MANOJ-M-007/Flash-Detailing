import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    // savedBookingFilter: [],
    // error: null,
};

const savedBookingFilterSlice = createSlice({
    name: "savedBookingFilter",
    initialState,
    reducers: {
        savedBookingFilterReq: (state, action) => {
            state.loading = true;
        },
        savedBookingFilterSuccess: (state, action) => {
            state.loading = false;
            state.savedBookingFilter = action.payload;
            state.savedBookingFilterSuccess = true;
        },
        // bannerSearchServiceFail: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
    },
});

export default savedBookingFilterSlice.reducer;
export const {
    savedBookingFilterReq,
    savedBookingFilterSuccess,
    // bannerSearchServiceFail,
} = savedBookingFilterSlice.actions;
