import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true
};

const providerReqSlice = createSlice({
    name: 'provider',
    initialState,
    reducers:{
        providerRegisterReq: (state, action) => {
            state.loading = true;
        },
        providerRegisterSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        providerRegisterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})
export default providerReqSlice.reducer;
export const { providerRegisterReq, providerRegisterSuccess, providerRegisterFail } =
providerReqSlice.actions