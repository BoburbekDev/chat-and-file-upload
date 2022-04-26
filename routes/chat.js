const router = require('express').Router()
const chatController = require('../controllers/chatController')

router.get('/historyChat', chatController.historyChat)
router.post('/sendFile', multer, chatController.sendFile)

module.exports = router