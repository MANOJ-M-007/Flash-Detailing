import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true
};

const adminDetailsSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        adminDetailsReq: (state, action) => {
            state.loading = true;
        },
        adminDetailsSuccess: (state, action) => {
            state.loading = false;
            state.adminDetails = action.payload;
            state.Success = true;
        },
        adminDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})
export default adminDetailsSlice.reducer;
export const { adminDetailsReq, adminDetailsSuccess,adminDetailsFail } =
adminDetailsSlice.actions