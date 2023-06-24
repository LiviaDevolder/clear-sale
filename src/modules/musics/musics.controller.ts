import { Request, Response } from "express"
import httpStatus from 'http-status'
import { musicsService } from "."
import { ApiError } from '../../utils/ApiError'
import { MongoServerError } from "mongodb"

export const createMusics = async (req: Request, res: Response) => {
  try {
    const musics = await musicsService.createMusics(req.body)
    res.status(httpStatus.CREATED).send(musics)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const readMusics = async (req: Request, res: Response) => {
  try {
    const musics = await musicsService.readMusics(req.params.id)
    res.status(httpStatus.OK).send(musics)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const readAllMusics = async (req: Request, res: Response) => {
  try {
    const musics = await musicsService.readAllMusics()
    res.status(httpStatus.OK).send(musics)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const updateMusics = async (req: Request, res: Response) => {
  try {
    const musics = await musicsService.updateMusics(req.params.id, req.body)
    res.status(httpStatus.OK).send(musics)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const deleteMusics = async (req: Request, res: Response) => {
  try {
    await musicsService.deleteMusics(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}
