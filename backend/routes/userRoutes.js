const express = require('express')
const {
    registerUser,
    authUser,
    listServices,
    listLocations,
    userLocationServices,
    bookingProvidersList,
    userDetails,
    addAddress,
    editProfile,
    searchBanner,
    paymentRequest,
    createOrder,
    listOrder,
    addComment,

} = require('../controllers/userControllers');
const userProtect = require('../middlewares/userAuthMiddleware');
const router = express.Router()

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/services').get(listServices);
router.route('/locations').get(listLocations);
router.route('/locationServices/:selectedLocation').get(userLocationServices);
router.route('/booking/providerslist/:selectedLocation').get(bookingProvidersList);
router.route('/userDetails').get(userProtect, userDetails);
router.route('/addAddress').post(userProtect, addAddress);
router.route('/editProfile').post(userProtect, editProfile);
router.route('/searchBanner').post(searchBanner);
router.route('/payment/create').post(paymentRequest);
router.route('/order/create').post(createOrder);
router.route('/order/list').get(userProtect, listOrder);
router.route('/comments').patch(userProtect, addComment);

module.exports = router