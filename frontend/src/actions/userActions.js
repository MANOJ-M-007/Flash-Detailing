// import axios from 'axios'
import { axiosInstance } from '../utility/axios'

import { userLoginFail, userLoginReq, userLoginSuccess, userLogout, } from '../features/users/userLoginSlice'
import { userRegisterReq, userRegisterSuccess, userRegisterFail, } from '../features/users/userRegisterSlice'
import { userServiceListReq, userServiceListSuccess, userServiceListFail, } from "../features/users/userServiceListSlice";
import { userLocationsListReq, userLocationsListSuccess, userLocationsListFail } from '../features/users/userLocationSlice';
import { userLocationAddReq, userLocationAddSuccess, userLocationAddFail } from '../features/users/userLocationAddSlice';
import { userLocationServicesListReq, userLocationServicesListSuccess, userLocationServicesListFail } from '../features/users/userLocationServicesListSlice'
import { userProvidersListReq, userProvidersListSuccess, userProvidersListFail, } from "../features/users/userProvidersListSlice"
import { userDetailsReq, userDetailsSuccess, userDetailsFail } from '../features/users/userDetailsSlice'
import { addressAddReq, addressAddSuccess, addressAddFail } from '../features/users/userAddressAddSlice'
import { profileEditReq, profileEditSuccess, profileEditFail } from '../features/users/userProfileEditSlice'
import { bannerSearchServiceReq, bannerSearchServiceSuccess, bannerSearchServiceFail, } from '../features/users/bannerServiceSearchSlice'
import { savedBookingFilterReq, savedBookingFilterSuccess, } from '../features/users/savedBookingFliterSlice'


export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());
    const { data } = await axiosInstance.post(
      "/api/users/login",
      { email, password, },
      config
    );
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs))
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const register = (name, email, mobile, password,) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userRegisterReq());
    const { data } = await axiosInstance.post(
      "/api/users",
      { name, email, mobile, password, },
      config
    );
    dispatch(userRegisterSuccess(data));
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userRegisterFail(errorIs))
  }
};

export const usersServiceListAction = () => async (dispatch, getState) => {
  try {
    dispatch(userServiceListReq());
    const { data } = await axiosInstance.get("/api/users/services");
    dispatch(userServiceListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userServiceListFail(message));
  }
};

export const usersLocationsListAction = () => async (dispatch, getState) => {
  try {
    dispatch(userLocationsListReq());
    const { data } = await axiosInstance.get("/api/users/locations");
    dispatch(userLocationsListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLocationsListFail(message));
  }
};

export const userLocationAddAction = (selectedLocation) => async (dispatch, getState) => {
  try {
    dispatch(userLocationAddReq());
    dispatch(userLocationAddSuccess(selectedLocation));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLocationAddFail(message));
  }
};

export const userLocationServicesListAction = (selectedLocation) => async (dispatch, getState) => {
  try {
    dispatch(userLocationServicesListReq());

    const { data } = await axiosInstance.get(`/api/users/locationServices/${selectedLocation}`,);

    dispatch(userLocationServicesListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLocationServicesListFail(message));
  }
};

export const providerListAction = (selectedLocation) => async (dispatch, getState) => {
  try {
    dispatch(userProvidersListReq());
    const { data } = await axiosInstance.get(`/api/users/booking/providerslist/${selectedLocation}`,);
    dispatch(userProvidersListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userProvidersListFail(message));
  }
};

export const userDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch(userDetailsReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get("/api/users/userDetails", config);
    dispatch(userDetailsSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userDetailsFail(message));
  }
};

export const userAddressAddAction = (Data) => async (dispatch, getState) => {
  try {
    dispatch(addressAddReq());
    const { userLogin: { userInfo }, } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axiosInstance.post("/api/users/addAddress", Data, config);
    dispatch(addressAddSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addressAddFail(message));
  }
};

export const profileEditAction = (Data) => async (dispatch, getState) => {
  try {
    dispatch(profileEditReq());
    const { userLogin: { userInfo }, } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axiosInstance.post("/api/users/editProfile", Data, config);
    dispatch(profileEditSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(profileEditFail(message));
  }
};

export const bannerSearchServiceAction = (service,selectedLocation) => async (dispatch, getState) => {
  try {
    const test = service.label
    dispatch(bannerSearchServiceReq());
    const { data } = await axiosInstance.post("/api/users/searchBanner", { test,selectedLocation }, );
    dispatch(bannerSearchServiceSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(bannerSearchServiceFail(message));
  }
};


export const savedBookingFilterAction = (providerId,provider, selectedVehicle, serviceSelect, date, time) => async (dispatch) => {
  dispatch(savedBookingFilterReq());
  const data = { providerId,provider, selectedVehicle, serviceSelect, date, time };
  dispatch(savedBookingFilterSuccess(data));
};