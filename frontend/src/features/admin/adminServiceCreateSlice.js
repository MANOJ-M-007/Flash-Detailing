import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
};
const serviceCreateSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        serviceCreateReq: (state, action) => {
            state.loading = true;
        },
        serviceCreateSuccess: (state, action) => {
            state.loading = false;
            state.service = action.payload;
            state.success = true;
        },
        serviceCreateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
    },
});
export default serviceCreateSlice.reducer;
export const {
    serviceCreateReq,
    serviceCreateSuccess,
    serviceCreateFail }
    = serviceCreateSlice.actions;