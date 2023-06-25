import httpStatus from 'http-status'
import { createSpeciesDTO } from './dto/create-species.dto'
import { updateSpeciesDTO } from './dto/update-species.dto'
import { Species } from '.'
import { ApiError } from '../../utils/ApiError'
import { validateId } from '../../utils/validateId'

export const readSpecies = async (id: string) => {
  validateId(id)

  const species = await Species.findOne({ _id: id })

  if (!species) throw new ApiError(httpStatus.NOT_FOUND, `Species with id "${id}" not found.`)

  return species
}

export const readSpeciesByName = async (name: string) => {
  const species = await Species.findOne({ name })

  return species
}

export const createSpecies = async (speciesBody: createSpeciesDTO) => {
  if (!speciesBody.name || !speciesBody.description) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'All fields must be filled correctly')
  }

  const species = new Species(speciesBody)

  return Species.create(species)
}

export const readAllSpecies = async () => {
  return Species.find().sort('-createdAt').exec()
}

export const updateSpecies = async (id: string, speciesBody: updateSpeciesDTO) => {
  validateId(id)
  await readSpecies(id)

  await Species.updateOne({ _id: id }, speciesBody)

  return readSpecies(id)
}

export const deleteSpecies = async (id: string) => {
  validateId(id)

  await readSpecies(id)

  await Species.deleteOne({ _id: id })
}
