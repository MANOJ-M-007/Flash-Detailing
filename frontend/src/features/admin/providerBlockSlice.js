import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blockloading: false,
    blockerror: null,
}

const providerBlockSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        providerBlockReq: (state, action) => {
            state.blockloading = true;
            state.blocksuccess = false;
        },
        providerBlockSuccess: (state, action) => {
            state.blockloading = false;
            state.blockprovider = action.payload;
            state.blocksuccess = true;
        },
        providerBlockFail: (state, action) => {
            state.blockloading = false;
            state.blockerror = action.payload;
            state.blocksuccess = false;
        },
    },
});

export default providerBlockSlice.reducer;
export const {
    providerBlockReq,
    providerBlockSuccess,
    providerBlockFail,
} = providerBlockSlice.actions;