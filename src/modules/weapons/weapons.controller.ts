import { Request, Response } from "express"
import httpStatus from 'http-status'
import { weaponsService } from "."
import { ApiError } from '../../utils/ApiError'
import { MongoServerError } from "mongodb"

export const createWeapons = async (req: Request, res: Response) => {
  try {
    const weapons = await weaponsService.createWeapons(req.body)
    res.status(httpStatus.CREATED).send(weapons)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    console.log(e)
  }
}

export const readWeapons = async (req: Request, res: Response) => {
  try {
    const weapons = await weaponsService.readWeapons(req.params.id)
    res.status(httpStatus.OK).send(weapons)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    console.log(e)
  }
}

export const readAllWeapons = async (req: Request, res: Response) => {
  try {
    const weapons = await weaponsService.readAllWeapons()
    res.status(httpStatus.OK).send(weapons)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    console.log(e)
  }
}

export const updateWeapons = async (req: Request, res: Response) => {
  try {
    const weapons = await weaponsService.updateWeapons(req.params.id, req.body)
    res.status(httpStatus.OK).send(weapons)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    console.log(e)
  }
}

export const deleteWeapons = async (req: Request, res: Response) => {
  try {
    await weaponsService.deleteWeapons(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    console.log(e)
  }
}
