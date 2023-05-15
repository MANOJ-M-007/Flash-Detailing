const express = require("express");
const adminProtect = require("../middlewares/adminAuthMiddleware");
const {
  authAdmin,
  getUsers,
  BlockUser,
  addService,
  getServices,
  blockService,
  providerDetails,
  providerDetailsIndividual,
  providerAcceptReject,
  providersList,
  blockProvider,
  addLocations,
  listLocations,
  ordersList,
  adminInfo,
  ordersGraph,
  serviceGraph
} = require('../controllers/adminControllers')


const router = express.Router()

router.route('/login').post(authAdmin);
router.route('/adminInfo').get(adminProtect, adminInfo);
router.route('/userlist').get(adminProtect, getUsers);
router.route('/userlist/:id').put(adminProtect, BlockUser)
router.route('/service/create').post(adminProtect, addService)
router.route('/services/list').get(adminProtect, getServices)
router.route('/service/block/:id').patch(adminProtect, blockService)
router.route('/provider/approvel').get(adminProtect, providerDetails)
router.route('/provider/approveldetails/:id').get(adminProtect, providerDetailsIndividual)
router.route('/provider/approvel/:id').patch(adminProtect, providerAcceptReject)
router.route('/providers/list').get(adminProtect, providersList)
router.route('/providers/block/:id').patch(adminProtect, blockProvider)
router.route('/location/create').post(adminProtect, addLocations)
router.route('/location/list').get(adminProtect, listLocations)
router.route('/orders/list').get(adminProtect, ordersList)
router.route('/orders/graph').get(ordersGraph)
router.route('/services/graph').get(serviceGraph)





module.exports = router;