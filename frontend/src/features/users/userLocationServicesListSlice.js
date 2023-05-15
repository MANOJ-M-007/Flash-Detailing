import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userLocationServicesListloading: true,
    userLocationServicesList: [],
    userLocationServicesListError: null,
};

const userLocationServicesListSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        userLocationServicesListReq: (state, action) => {
            state.userLocationServicesListloading = true;
        },
        userLocationServicesListSuccess: (state, action) => {
            state.userLocationServicesListloading = false;
            state.userLocationServicesList = action.payload;
            // state.userLocationServicesSuccess = true;
        },
        userLocationServicesListFail: (state, action) => {
            state.userLocationServicesListloading = false;
            state.userLocationServicesListError = action.payload;
        },
    },
})

export default userLocationServicesListSlice.reducer;
export const { userLocationServicesListReq, userLocationServicesListSuccess, userLocationServicesListFail } =
    userLocationServicesListSlice.actions