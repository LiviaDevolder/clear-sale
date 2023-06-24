import httpStatus from 'http-status'
import { createWeaponsDTO } from './dto/create-weapons.dto'
import { updateWeaponsDTO } from './dto/update-weapons.dto'
import { Weapons } from '.'
import { ApiError } from '../../utils/ApiError'
import { validateId } from '../../utils/validateId'

export const readWeapons = async (id: string) => {
  validateId(id)

  const weapons = await Weapons.findOne({ _id: id })

  if (!weapons) throw new ApiError(httpStatus.NOT_FOUND, `Weapons with id "${id}" not found.`)

  return weapons
}

export const createWeapons = async (weaponsBody: createWeaponsDTO) => {
  if (!weaponsBody.name || !weaponsBody.type || !weaponsBody.image) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'All fields must be filled correctly')
  }

  const weapons = new Weapons(weaponsBody)

  return Weapons.create(weapons)
}

export const readAllWeapons = async () => {
  return Weapons.find().sort('-createdAt').exec()
}

export const updateWeapons = async (id: string, weaponsBody: updateWeaponsDTO) => {
  validateId(id)
  await readWeapons(id)

  await Weapons.updateOne({ _id: id }, weaponsBody)

  return readWeapons(id)
}

export const deleteWeapons = async (id: string) => {
  validateId(id)

  await readWeapons(id)

  await Weapons.deleteOne({ _id: id })
}
