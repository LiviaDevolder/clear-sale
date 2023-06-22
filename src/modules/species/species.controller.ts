import { Request, Response } from "express";
import httpStatus from 'http-status'
import { speciesService } from ".";

export const createSpecies = async (req: Request, res: Response) => {
  const species = await speciesService.createSpecies(req.body)
  res.status(httpStatus.CREATED).send(species)
}

export const readAllSpecies = async (req: Request, res: Response) => {
  const species = await speciesService.readAllSpecies()
  res.status(httpStatus.OK).send(species)
}
