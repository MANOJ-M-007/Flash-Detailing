import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locationsloading: true,
    locations: [],
    locationsError: null,
};

const userLocationsListSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        userLocationsListReq: (state, action) => {
            state.locationsloading = true;
        },
        userLocationsListSuccess: (state, action) => {
            state.locationsloading = false;
            state.locations = action.payload;
            state.locationsSuccess = true;
        },
        userLocationsListFail: (state, action) => {
            state.locationsloading = false;
            state.locationsError = action.payload;
        },
    },
})

export default userLocationsListSlice.reducer;
export const { userLocationsListReq, userLocationsListSuccess, userLocationsListFail } =
    userLocationsListSlice.actions