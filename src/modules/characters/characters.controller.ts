import { Request, Response } from "express"
import httpStatus from 'http-status'
import { charactersService } from "."
import { ApiError } from '../../utils/ApiError'
import { MongoServerError } from "mongodb"

export const createCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await charactersService.createCharacters(req.body)
    res.status(httpStatus.CREATED).send(characters)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const readCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await charactersService.readCharacters(req.params.id)
    res.status(httpStatus.OK).send(characters)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const readAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await charactersService.readAllCharacters()
    res.status(httpStatus.OK).send(characters)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const updateCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await charactersService.updateCharacters(req.params.id, req.body)
    res.status(httpStatus.OK).send(characters)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}

export const deleteCharacters = async (req: Request, res: Response) => {
  try {
    await charactersService.deleteCharacters(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
    if (e instanceof MongoServerError) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(e.message)
    res.status(httpStatus.NOT_FOUND).send(JSON.stringify({ error: e}))
  }
}
