import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { protect } from './middlewares/authMiddleware.js'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import errorHandler from './middlewares/errorHandler.js'

const swaggerDocument = JSON.parse(
  fs.readFileSync('./src/docs/swagger.json', 'utf-8')
)

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

console.log('Swagger UI disponível em: http//localhost:5000/api-docs')

app.use('/api/tasks', protect, taskRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

export default app
