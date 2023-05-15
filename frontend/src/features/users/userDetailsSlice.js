import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true
};

const userDetailsSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        userDetailsReq: (state, action) => {
            state.loading = true;
        },
        userDetailsSuccess: (state, action) => {
            state.loading = false;
            state.userDetails = action.payload;
            state.Success = true;
        },
        userDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})
export default userDetailsSlice.reducer;
export const { userDetailsReq, userDetailsSuccess,userDetailsFail } =
userDetailsSlice.actions