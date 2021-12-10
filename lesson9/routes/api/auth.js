const express = require('express')

const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
)
// router.post('/signup')
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login))
// router.post('/signin')
router.post('/logout', auth, ctrlWrapper(ctrl.logout))
// router.post('/signout')

module.exports = router
