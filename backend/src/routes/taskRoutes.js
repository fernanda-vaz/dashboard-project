import express from 'express'
import { body } from 'express-validator'
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} from '../controllers/taskController.js'

const router = express.Router()

router.post(
  '/',
  body('title').notEmpty().withMessage('Escreva o título'),
  createTask
)

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
