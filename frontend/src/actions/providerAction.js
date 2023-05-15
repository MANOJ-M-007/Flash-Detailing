// import axios from 'axios'
import { axiosInstance } from '../utility/axios'

import { providerRegisterReq, providerRegisterSuccess, providerRegisterFail } from '../features/provider/providerReqSlice'
import { providerDetailsReq, providerDetailsSuccess, providerDetailsFail } from '../features/provider/providerDetailsSlice'

export const providerReq = (
  location,
  address,
  city,
  state,
  pin,
  country,
  washMethod,
  describe,
  suv,
  sedan,
  hatchback,
  aadhar,
  profile
) => async (dispatch, getState) => {
  try {
    dispatch(providerRegisterReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosInstance.post(
      "/api/provider/request",
      {
        location,
        address,
        city,
        state,
        pin,
        country,
        washMethod,
        describe,
        suv,
        sedan,
        hatchback,
        aadhar,
        profile
      },
      config

    );
    dispatch(providerRegisterSuccess(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerRegisterFail(errorIs))
  }
}

export const providerDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch(providerDetailsReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get("/api/provider/providerDetails", config);
    dispatch(providerDetailsSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerDetailsFail(message));
  }
};