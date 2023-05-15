import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    bannerSearchService: [],
    error: null,
};

const bannerSearchServiceSlice = createSlice({
    name: "bannerSearchService",
    initialState,
    reducers: {
        bannerSearchServiceReq: (state, action) => {
            state.loading = true;
        },
        bannerSearchServiceSuccess: (state, action) => {
            state.loading = false;
            state.bannerSearchService = action.payload;
            state.bannerServiceSuccess = true;
        },
        bannerSearchServiceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default bannerSearchServiceSlice.reducer;
export const {
    bannerSearchServiceReq,
    bannerSearchServiceSuccess,
    bannerSearchServiceFail,
} = bannerSearchServiceSlice.actions;
