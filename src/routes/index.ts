import { Router } from 'express'
import { listRoutes } from './list-routes'

export const routes = Router()

routes.use('/list', listRoutes)
