import httpStatus from 'http-status'
import { createLocationsDTO } from './dto/create-locations.dto'
import { updateLocationsDTO } from './dto/update-locations.dto'
import { Locations } from '.'
import { ApiError } from '../../utils/ApiError'
import { validateId } from '../../utils/validateId'
import { readSpecies } from '../species/species.service'

export const readLocations = async (id: string) => {
  validateId(id)

  const locations = await Locations.findOne({ _id: id }).populate({
      path: "dominant_species_id",
      populate: {
         path: "name",
         select: { body: 1 }
      }
   }).exec()

  if (!locations) throw new ApiError(httpStatus.NOT_FOUND, `Locations with id "${id}" not found.`)

  return locations
}

export const createLocations = async (locationsBody: createLocationsDTO) => {
  if (!locationsBody.name || !locationsBody.type || !locationsBody.image || !locationsBody.dominant_species_id) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'All fields must be filled correctly')
  }

  validateId(locationsBody.dominant_species_id)
  await readSpecies(locationsBody.dominant_species_id)

  const locations = new Locations(locationsBody)

  return Locations.create(locations)
}

export const readAllLocations = async () => {
  return Locations.find().populate({
      path: "dominant_species_id",
      populate: {
         path: "name",
         select: { body: 1 }
      }
   }).sort('-createdAt').exec()
}

export const updateLocations = async (id: string, locationsBody: updateLocationsDTO) => {
  validateId(id)

  const locations = await readLocations(id)

  if (!locations) throw new ApiError(httpStatus.NOT_FOUND, `Locations with id "${id}" not found.`)

  await Locations.updateOne({ _id: id }, locationsBody)

  return readLocations(id)
}

export const deleteLocations = async (id: string) => {
  validateId(id)

  await readLocations(id)

  await Locations.deleteOne({ _id: id })
}
