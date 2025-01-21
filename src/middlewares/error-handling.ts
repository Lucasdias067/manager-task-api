/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../routes/errors/app-error'
import { ZodError } from 'zod'

export function ErrorHandling(
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message })
  }

  if (error instanceof ZodError) {
    res
      .status(400)
      .json({ message: 'Validation error', issues: error.format() })
  }
  res.status(500).json({ message: error.message })
}
