import { configureStore } from '@reduxjs/toolkit'
//user
import userLoginReducer from '../features/users/userLoginSlice'
import userRegisterReducer from '../features/users/userRegisterSlice';
import usersListReducer from "../features/admin/userListSlice"
import userServiceReducer from '../features/users/userServiceListSlice'
import userLocationsListReducer from '../features/users/userLocationSlice'
import userLocationAddReducer from '../features/users/userLocationAddSlice'
import userLocationServicesListReducer from '../features/users/userLocationServicesListSlice'
import userProvidersListReducer from '../features/users/userProvidersListSlice'
import userDetailsReducer from '../features/users/userDetailsSlice'
import addressAddReducer from '../features/users/userAddressAddSlice'
import profileEditReducer from '../features/users/userProfileEditSlice'
import bannerSearchServiceReducer from '../features/users/bannerServiceSearchSlice'
import savedBookingFliterReducer from '../features/users/savedBookingFliterSlice';
//admin
import adminLoginReducer from '../features/admin/adminLoginSlice'
import adminDetailsReducer from'../features/admin/adminDetailsSlice'
import adminUserBlockReducer from '../features/admin/adminBlockSlice'
import adminServiceCreateReducer from '../features/admin/adminServiceCreateSlice';
import serviceListReducer from '../features/admin/adminServiceListSlice'
import serviceBlockReducer from '../features/admin/adminServiceBlockSlice'
import providersReqReducer from '../features/admin/ProviderVerifySlice'
import providerAcceptRejectReducer from '../features/admin/providerAcceptRejectSlice'
import providersListReducer from '../features/admin/providerListSlice'
import providerBlockReducer from '../features/admin/providerBlockSlice'
import providerProfileReducer from '../features/admin/providerIndividualDetailsSlice'
import adminCreateLocationReducer from '../features/admin/adminLocationsCreateSlice'
import locationsListReducer from '../features/admin/adminLocationsListSlice'
import ordersListReducer from '../features/admin/adminOrdersListSlice'
//provider
import providerReqReducer from '../features/provider/providerReqSlice'
import providerDetailsReducer from '../features/provider/providerDetailsSlice'
const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userServiceList: userServiceReducer,
    userLocationsList: userLocationsListReducer,
    userLocationAdd: userLocationAddReducer,
    userLocationServices: userLocationServicesListReducer,
    userProvidersList: userProvidersListReducer,
    userDetails: userDetailsReducer,
    userAddressAdd: addressAddReducer,
    profileEditData: profileEditReducer,
    bannerSearchService: bannerSearchServiceReducer,
    savedBookingFliterData:savedBookingFliterReducer,

    adminLogin: adminLoginReducer,
    adminDetails:adminDetailsReducer,
    adminUserList: usersListReducer,
    adminUserBlock: adminUserBlockReducer,
    adminServiceCreate: adminServiceCreateReducer,
    adminServiceList: serviceListReducer,
    adminServiceBlock: serviceBlockReducer,
    providerReq: providerReqReducer,
    providersVerifyList: providersReqReducer,
    providerAcceptReject: providerAcceptRejectReducer,
    providersList: providersListReducer,
    providerBlock: providerBlockReducer,
    providerProfileDetail: providerProfileReducer,
    admiCreateLocation: adminCreateLocationReducer,
    locationsList: locationsListReducer,
    ordersList:ordersListReducer,

    providerDetails: providerDetailsReducer

  }
})

export default store;
