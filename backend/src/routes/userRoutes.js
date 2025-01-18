import express from 'express'
import {
  registerUser,
  loginUser,
  getUsers,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateUser } from '../validators/userValidator.js'

const router = express.Router()

router.post('/register', validateUser, registerUser)
router.post('/login', loginUser)
router.get('/', protect, getUsers)

export default router
