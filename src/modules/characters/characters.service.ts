import httpStatus from 'http-status'
import { createCharactersDTO } from './dto/create-characters.dto'
import { updateCharactersDTO } from './dto/update-characters.dto'
import { Characters } from '.'
import { ApiError } from '../../utils/ApiError'
import { validateId } from '../../utils/validateId'
import { readSpecies } from '../species/species.service'
import { readLocations } from '../locations/locations.service'
import { readWeapons } from '../weapons/weapons.service'

export const readCharacters = async (id: string) => {
  validateId(id)

  const characters = await Characters.findOne({ _id: id }).populate([{
      path: "home_location_id",
      populate: {
        path: "name",
        select: { body: 1 }
      }
    },
    {
      path: "species_id",
      populate: {
        path: "name",
        select: { body: 1 }
      }
    },
    {
      path: "weapon_id",
      populate: {
         path: "name",
        select: { body: 1 }
      }
    },
  ]).exec()

  if (!characters) throw new ApiError(httpStatus.NOT_FOUND, `Characters with id "${id}" not found.`)

  return characters
}

export const createCharacters = async (charactersBody: createCharactersDTO) => {
  if (
    !charactersBody.name ||
    !charactersBody.age ||
    !charactersBody.main_color ||
    !charactersBody.is_fusion ||
    !charactersBody.gender ||
    !charactersBody.pronouns ||
    !charactersBody.height ||
    !charactersBody.nickname ||
    !charactersBody.image ||
    !charactersBody.home_location_id ||
    !charactersBody.species_id ||
    !charactersBody.weapon_id
  ) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'All fields must be filled correctly')
  }

  validateId(charactersBody.home_location_id)
  await readLocations(charactersBody.home_location_id)
  validateId(charactersBody.species_id)
  await readSpecies(charactersBody.species_id)
  validateId(charactersBody.weapon_id)
  await readWeapons(charactersBody.weapon_id)

  const characters = new Characters(charactersBody)

  return Characters.create(characters)
}

export const readAllCharacters = async () => {
  return Characters.find().populate([{
      path: "home_location_id",
      populate: {
        path: "name",
        select: { body: 1 }
      }
    },
    {
      path: "species_id",
      populate: {
        path: "name",
        select: { body: 1 }
      }
    },
    {
      path: "weapon_id",
      populate: {
         path: "name",
        select: { body: 1 }
      }
    },
  ]).sort('-createdAt').exec()
}

export const updateCharacters = async (id: string, charactersBody: updateCharactersDTO) => {
  validateId(id)

  const characters = await readCharacters(id)

  if (!characters) throw new ApiError(httpStatus.NOT_FOUND, `Characters with id "${id}" not found.`)

  await Characters.updateOne({ _id: id }, charactersBody)

  return readCharacters(id)
}

export const deleteCharacters = async (id: string) => {
  validateId(id)

  await readCharacters(id)

  await Characters.deleteOne({ _id: id })
}
