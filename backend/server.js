import dotenv from 'dotenv'
import { connectDB } from './src/config/database.js'
import app from './src/app.js'

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

startServer()
