import { createSpeciesDTO } from './dto/create-species.dto'
import { Species } from './species.model'
import mongoose from 'mongoose'

export const createSpecies = async (speciesBody: createSpeciesDTO) => {
  const species = new Species({
    _id: new mongoose.Types.ObjectId(),
    ...speciesBody
  })

  return Species.create(species)
}

export const readAllSpecies = async () => {
  return await Species.find().sort('-createdAt').exec()
};