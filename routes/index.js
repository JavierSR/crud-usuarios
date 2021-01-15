const express = require('express')
const router = express.Router()
const userController = require ('../controllers/user.js')

router.post('/user', userController.create)
router.get('/user', userController.get)
router.patch('/user', userController.update)
router.delete('/user', userController.delete)

module.exports = router