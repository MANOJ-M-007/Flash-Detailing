import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    servicesLoading: false,
    services: [],
    servicesError: null,
}

const serviceListSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        serviceListReq: (state, action) => {
            state.servicesLoading = true;
        },
        serviceListSuccess: (state, action) => {
            state.servicesLoading = false;
            state.services = action.payload;
        },
        serviceListFail: (state, action) => {
            state.servicesLoading = false;
            state.servicesError = action.payload;
        },
    },
});

export default serviceListSlice.reducer;
export const { serviceListReq, serviceListSuccess, serviceListFail } =
serviceListSlice.actions;
