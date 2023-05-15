import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true
};

const userLocationAddSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        userLocationAddReq: (state, action) => {
            state.loading = true;
        },
        userLocationAddSuccess: (state, action) => {
            state.loading = false;
            state.LocationAdd = action.payload;
            state.locationAddSuccess = true;
        },
        userLocationAddFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})
export default userLocationAddSlice.reducer;
export const { userLocationAddReq, userLocationAddSuccess, userLocationAddFail } =
userLocationAddSlice.actions