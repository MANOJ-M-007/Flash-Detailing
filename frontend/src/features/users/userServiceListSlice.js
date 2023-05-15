import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    servicesloading: true,
    services: [],
    servicesError: null,
};

const userServiceListSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        userServiceListReq: (state, action) => {
            state.servicesloading = true;
        },
        userServiceListSuccess: (state, action) => {
            state.servicesloading = false;
            state.services = action.payload;
            state.success = true;
        },
        userServiceListFail: (state, action) => {
            state.servicesloading = false;
            state.servicesloading = action.payload;
        },
    },
})

export default userServiceListSlice.reducer;
export const { userServiceListReq, userServiceListSuccess, userServiceListFail } =
    userServiceListSlice.actions