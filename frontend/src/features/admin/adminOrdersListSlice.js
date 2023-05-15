import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ordersLoading: false,
    orders: [],
    ordersError: null,
}

const ordersListSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        ordersListReq: (state, action) => {
            state.ordersLoading = true;
        },
        ordersListSuccess: (state, action) => {
            state.ordersLoading = false;
            state.orders = action.payload;
        },
        ordersListFail: (state, action) => {
            state.ordersLoading = false;
            state.ordersError = action.payload;
        },
    },
});

export default ordersListSlice.reducer;
export const { ordersListReq, ordersListSuccess, ordersListFail } =
ordersListSlice.actions;
