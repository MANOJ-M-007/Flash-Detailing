import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addressAddloading: true
};

const addressAddSlice = createSlice({
    name: 'address',
    initialState,
    reducers:{
        addressAddReq: (state, action) => {
            state.addressAddloading = true;
        },
        addressAddSuccess: (state, action) => {
            state.addressAddloading = false;
            state.addressAdd = action.payload;
            state.addressAddSuccess = true;
        },
        addressAddFail: (state, action) => {
            state.addressAddloading = false;
            state.addressAdderror = action.payload;
        },
    }
})
export default addressAddSlice.reducer;
export const { addressAddReq, addressAddSuccess, addressAddFail } =
addressAddSlice.actions