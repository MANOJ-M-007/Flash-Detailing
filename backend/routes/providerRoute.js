const express = require("express");
const {
    toVerify,
    profileDatas,
    orderList,
    orderComplete,
    ordersGraph
} = require("../controllers/providerController");
const router = express.Router()
const userProtect = require('../middlewares/userAuthMiddleware')
// const toVerify = require('../controllers/providerController')

router.route('/request').post(userProtect, toVerify);
router.route('/providerDetails').get(userProtect, profileDatas)
router.route('/order/list').get(userProtect, orderList)
router.route('/order/complete').patch(userProtect, orderComplete)
router.route('/orders/graph').get(userProtect, ordersGraph)

module.exports = router