import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true
};

const providerDetailsSlice = createSlice({
    name: 'provider',
    initialState,
    reducers:{
        providerDetailsReq: (state, action) => {
            state.loading = true;
        },
        providerDetailsSuccess: (state, action) => {
            state.loading = false;
            state.providerDetails = action.payload;
            state.Success = true;
        },
        providerDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})
export default providerDetailsSlice.reducer;
export const { providerDetailsReq, providerDetailsSuccess,providerDetailsFail } =
providerDetailsSlice.actions