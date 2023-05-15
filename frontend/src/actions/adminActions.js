// import axios from 'axios'
import { axiosInstance } from '../utility/axios'

import { adminLoginFail, adminLoginReq, adminLoginSuccess, adminLogout, } from '../features/admin/adminLoginSlice'
import { usersListReq, usersListSuccess, usersListFail, } from "../features/admin/userListSlice";
import { userBlockReq, userBlockSuccess, userBlockFail } from '../features/admin/adminBlockSlice'
import { serviceCreateReq, serviceCreateSuccess, serviceCreateFail } from '../features/admin/adminServiceCreateSlice'
import { serviceListReq, serviceListSuccess, serviceListFail } from '../features/admin/adminServiceListSlice'
import { serviceBlockReq, serviceBlockSuccess, serviceBlockFail, } from '../features/admin/adminServiceBlockSlice'
import { providersReqReq, providersReqSuccess, providersReqFail, } from '../features/admin/ProviderVerifySlice'
import { providerAcceptRejectReq, providerAcceptRejectSuccess, providerAcceptRejectFail, } from '../features/admin/providerAcceptRejectSlice'
import { providersListReq, providersListSuccess, providersListFail, } from "../features/admin/providerListSlice"
import { providerBlockReq, providerBlockSuccess, providerBlockFail, } from '../features/admin/providerBlockSlice'
import { providerProfileReq, providerProfileSuccess, providerProfileFail, } from '../features/admin/providerIndividualDetailsSlice'
import { locationCreateReq, locationCreateSuccess, locationCreateFail } from '../features/admin/adminLocationsCreateSlice'
import { locationsListReq, locationsListSuccess, locationsListFail } from '../features/admin/adminLocationsListSlice'
import { ordersListReq, ordersListSuccess, ordersListFail } from '../features/admin/adminOrdersListSlice'
import { adminDetailsReq, adminDetailsSuccess, adminDetailsFail } from '../features/admin/adminDetailsSlice'

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(adminLoginReq());
    const { data } = await axiosInstance.post(
      "/api/admin/login",
      {
        email,
        password,
      },
      config
    );

    dispatch(adminLoginSuccess(data));
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(adminLoginFail(errorIs))
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch(adminLogout());
};


export const listusers = () => async (dispatch, getState) => {
  try {
    dispatch(usersListReq());
    const { adminLogin: { adminInfo }, } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/admin/userlist`, config);
    dispatch(usersListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(usersListFail(message));
  }
};


export const blockUserAction = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(userBlockReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const sendStatus = {
      isBlocked: status,
    };
    const { data } = await axiosInstance.put(
      `/api/admin/userlist/${id}`,
      sendStatus,
      config
    );
    dispatch(userBlockSuccess(data));
    localStorage.removeItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userBlockFail(message));
  }
};

export const createServiceAction = (name, details, image) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(serviceCreateReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.post(
      '/api/admin/service/create',
      { name, details, image },
      config
    );
    dispatch(serviceCreateSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(serviceCreateFail(message));
  }
}


export const listServicesAction = () => async (dispatch, getState) => {
  try {
    dispatch(serviceListReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/admin/services/list`, config);
    dispatch(serviceListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(serviceListFail(message));
  }
};

export const blockServiceAction = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(serviceBlockReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const sendStatus = {
      isBlocked: status,
    };
    const { data } = await axiosInstance.patch(
      `/api/admin/service/block/${id}`,
      sendStatus,
      config
    );
    dispatch(serviceBlockSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(serviceBlockFail(message));
  }
}

export const ProviderVerify = () => async (dispatch, getState) => {
  try {
    dispatch(providersReqReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/admin/provider/approvel`, config);
    dispatch(providersReqSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providersReqFail(message));
  }
};

export const providerAcceptRejectAction = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(providerAcceptRejectReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const sendStatus = {
      action: status,
    };
    const { data } = await axiosInstance.patch(
      `/api/admin/provider/approvel/${id}`,
      sendStatus,
      config
    );
    dispatch(providerAcceptRejectSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerAcceptRejectFail(message));
  }
}

export const providerList = () => async (dispatch, getState) => {
  try {
    dispatch(providersListReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/admin/providers/list`, config);
    dispatch(providersListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providersListFail(message));
  }
};

export const blockProviderAction = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(providerBlockReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const sendStatus = {
      isBlocked: status,
    };
    const { data } = await axiosInstance.patch(
      `/api/admin/providers/block/${id}`,
      sendStatus,
      config
    );
    dispatch(providerBlockSuccess(data));
    localStorage.removeItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerBlockFail(message));
  }
};

export const providerIndividualDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(providerProfileReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(
      `/api/admin/provider/approveldetails/${id}`,
      config
    );
    dispatch(providerProfileSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(providerProfileFail(message));
  }
}

export const createLocationAction = (name) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(locationCreateReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.post(
      '/api/admin/location/create',
      { name },
      config
    );
    dispatch(locationCreateSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(locationCreateFail(message));
  }
}

export const listLocationsAction = () => async (dispatch, getState) => {
  try {
    dispatch(locationsListReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/admin/location/list`, config);
    dispatch(locationsListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(locationsListFail(message));
  }
};

export const ordersListAction = () => async (dispatch, getState) => {
  try {
    dispatch(ordersListReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/admin/orders/list`, config);
    dispatch(ordersListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ordersListFail(message));
  }
};

export const adminDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch(adminDetailsReq());
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data, userCount, providerCount } = await axiosInstance.get("/api/admin/adminInfo", config);
    dispatch(adminDetailsSuccess(data, userCount, providerCount));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(adminDetailsFail(message));
  }
};