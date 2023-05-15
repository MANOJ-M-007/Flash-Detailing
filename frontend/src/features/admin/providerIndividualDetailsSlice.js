import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loadingAction: false,
    errorAction: null,
    profilesuccess:false,
}

const providerProfileSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        providerProfileReq: (state, action) => {
            state.loadingAction = true;
            state.profilesuccess = false;
        },
        providerProfileSuccess: (state, action) => {
            state.loadingAction = false;
            state.Data = action.payload;
            state.profilesuccess = true;
        },
        providerProfileFail: (state, action) => {
            state.loadingAction = false;
            state.errorAction = action.payload;
            state.profilesuccess = false;
        },
    },
});

export default providerProfileSlice.reducer;
export const {
    providerProfileReq,
    providerProfileSuccess,
    providerProfileFail,
} = providerProfileSlice.actions;