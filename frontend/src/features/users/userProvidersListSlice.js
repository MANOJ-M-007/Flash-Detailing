import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  providers: [],
  error: null,
};

const userProvidersListSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userProvidersListReq: (state, action) => {
      state.loading = true;
    },
    userProvidersListSuccess: (state, action) => {
      state.loading = false;
      state.providers = action.payload;
      console.log(state.providers);
      state.success = true;
    },
    userProvidersListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userProvidersListSlice.reducer;
export const {
  userProvidersListReq,
  userProvidersListSuccess,
  userProvidersListFail,
} = userProvidersListSlice.actions;
