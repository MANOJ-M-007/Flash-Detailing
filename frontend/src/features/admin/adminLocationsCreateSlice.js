import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
};
const locationCreateSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        locationCreateReq: (state, action) => {
            state.loading = true;
        },
        locationCreateSuccess: (state, action) => {
            state.loading = false;
            state.location = action.payload;
            state.success = true;
        },
        locationCreateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
    },
});
export default locationCreateSlice.reducer;
export const {
    locationCreateReq,
    locationCreateSuccess,
    locationCreateFail }
    = locationCreateSlice.actions;