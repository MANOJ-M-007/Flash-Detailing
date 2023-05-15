import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  providers: [],
  error: null,
};

const providersReqSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    providersReqReq: (state, action) => {
      state.loading = true;
    },
    providersReqSuccess: (state, action) => {
      state.loading = false;
      state.providers = action.payload;
    },
    providersReqFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default providersReqSlice.reducer;
export const {
    providersReqReq,
    providersReqSuccess,
    providersReqFail,
} = providersReqSlice.actions;