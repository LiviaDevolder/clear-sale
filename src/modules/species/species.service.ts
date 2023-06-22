import { createSpeciesDTO } from './dto/create-species.dto'
import { updateSpeciesDTO } from './dto/update-species.dto'
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
  return Species.find().sort('-createdAt').exec()
}

export const readSpecies = async (id: string) => {
  const species = await Species.findOne({ _id: id })

  if (!species) throw new Error(`Role with id "${id}" not found.`)

  return species
}

export const updateSpecies = async (id: string, speciesBody: updateSpeciesDTO) => {
  const species = await readSpecies(id)

  if (!species) throw new Error(`Role with id "${id}" not found.`)

  if (!speciesBody.name || !speciesBody.description) {
    throw new Error('The fields name and description are required')
  }

  await Species.updateOne({ _id: id }, speciesBody)

  return readSpecies(id)
}

export const deleteSpecies = async (id: string) => {
  return Species.findByIdAndDelete(id)
}
