import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profileEditloading: true
};

const profileEditSlice = createSlice({
    name: 'profileEdit',
    initialState,
    reducers:{
        profileEditReq: (state, action) => {
            state.profileEditloading = true;
        },
        profileEditSuccess: (state, action) => {
            state.profileEditloading = false;
            state.profileEdit = action.payload;
            state.profileEditSuccess = true;
        },
        profileEditFail: (state, action) => {
            state.profileEditloading = false;
            state.profileEditerror = action.payload;
        },
    }
})
export default profileEditSlice.reducer;
export const { profileEditReq, profileEditSuccess, profileEditFail } =
profileEditSlice.actions