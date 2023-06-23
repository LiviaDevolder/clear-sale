import { Request, Response } from "express"
import httpStatus from 'http-status'
import { speciesService } from "."
import { ApiError } from '../../utils/ApiError'

export const createSpecies = async (req: Request, res: Response) => {
  try {
    const species = await speciesService.createSpecies(req.body)
    res.status(httpStatus.CREATED).send(species)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
  }
}

export const readSpecies = async (req: Request, res: Response) => {
  try {
    const species = await speciesService.readSpecies(req.params.id)
    res.status(httpStatus.OK).send(species)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
  }
}

export const readAllSpecies = async (req: Request, res: Response) => {
  try {
    const species = await speciesService.readAllSpecies()
    res.status(httpStatus.OK).send(species)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
  }
}

export const updateSpecies = async (req: Request, res: Response) => {
  try {
    const species = await speciesService.updateSpecies(req.params.id, req.body)
    res.status(httpStatus.OK).send(species)
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
  }
}

export const deleteSpecies = async (req: Request, res: Response) => {
  try {
    await speciesService.deleteSpecies(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    if (e instanceof ApiError) res.status(e.statusCode).send(e.message)
  }
}
