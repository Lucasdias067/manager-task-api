import { NextFunction, Request, Response } from 'express'
import { AppError } from '../routes/errors/app-error'
import { prisma } from '../database/prisma'
import z from 'zod'

export class ListController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        list: z.string(),
      })

      const { list } = bodySchema.parse(req.body)

      if (!list) {
        throw new AppError('List is required', 400)
      }

      const listExists = await prisma.list.findFirst({
        where: { items: list.toLowerCase() },
      })

      if (listExists) {
        throw new AppError('List already exists', 400)
      }

      await prisma.list.create({
        data: { items: list.toLowerCase() },
      })

      res.status(201).json({ message: 'List created successfully' })
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const allItems = await prisma.list.findMany()

      if (allItems.length === 0) {
        throw new AppError('No items found', 404)
      }

      res.status(200).json(allItems)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string(),
      })

      const { id } = paramsSchema.parse(req.params)

      const idExists = await prisma.list.findUnique({ where: { id } })

      if (!idExists) {
        throw new AppError('List not found', 404)
      }

      await prisma.list.delete({ where: { id } })
      res.status(200).json({ message: 'List deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}
