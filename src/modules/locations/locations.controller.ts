import { Request, Response } from "express"
import httpStatus from 'http-status'
import { locationsService } from "."
import { ApiError } from '../../utils/ApiError'
import { MongoServerError } from "mongodb"

export const createLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationsService.createLocations(req.body)
    res.status(httpStatus.CREATED).send(locations)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const readLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationsService.readLocations(req.params.id)
    res.status(httpStatus.OK).send(locations)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const readAllLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationsService.readAllLocations()
    res.status(httpStatus.OK).send(locations)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const updateLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationsService.updateLocations(req.params.id, req.body)
    res.status(httpStatus.OK).send(locations)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const deleteLocations = async (req: Request, res: Response) => {
  try {
    await locationsService.deleteLocations(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}
