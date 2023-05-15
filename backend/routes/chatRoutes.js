const express = require('express')
const {
    createChat,
    userChat,
    findChat,
    getUsers
} = require('../controllers/chatControllers')
const userProtect = require('../middlewares/userAuthMiddleware');
const router = express.Router()

//chat routes
router.route('/createChat').post(createChat)
router.route('/userChat/:id/:receiverId').get(userChat)
router.route('/getUsers/:id').get(getUsers)
router.route('/findChat/:firstId/:secondId').get(findChat)

module.exports = router