import express from 'express'
import { routes } from './routes'
import cors from 'cors'
import 'express-async-errors'
import { ErrorHandling } from './middlewares/error-handling'

export const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(routes)
app.use(ErrorHandling)
