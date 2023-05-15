import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sloading: false,
    serror: null,
}

const serviceBlockSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        serviceBlockReq: (state, action) => {
            state.sloading = true;
            state.ssuccess = false;
        },
        serviceBlockSuccess: (state, action) => {
            state.sloading = false;
            state.sblock = action.payload;
            state.ssuccess = true;
        },
        serviceBlockFail: (state, action) => {
            state.sloading = false;
            state.serror = action.payload;
            state.ssuccess = false;
        },
    },
});

export default serviceBlockSlice.reducer;
export const {
    serviceBlockReq,
    serviceBlockSuccess,
    serviceBlockFail,
} = serviceBlockSlice.actions;