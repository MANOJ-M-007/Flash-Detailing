import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locationsLoading: false,
    locations: [],
    locationsError: null,
}

const locationsListSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        locationsListReq: (state, action) => {
            state.locationsLoading = true;
        },
        locationsListSuccess: (state, action) => {
            state.locationsLoading = false;
            state.locations = action.payload;
        },
        locationsListFail: (state, action) => {
            state.locationsLoading = false;
            state.locationsError = action.payload;
        },
    },
});

export default locationsListSlice.reducer;
export const { locationsListReq, locationsListSuccess, locationsListFail } =
    locationsListSlice.actions;
