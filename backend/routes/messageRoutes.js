const express = require('express')
const {
    addMessage,
    getMessage,

} = require('../controllers/messageControllers')
// const userProtect = require('../middlewares/userAuthMiddleware');
const router = express.Router()

//message routes
router.route('/addMessage').post(addMessage)
router.route('/getMessage/:chatId').get(getMessage)


module.exports = router