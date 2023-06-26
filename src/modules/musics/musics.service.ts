import httpStatus from 'http-status'
import { createMusicsDTO } from './dto/create-musics.dto'
import { updateMusicsDTO } from './dto/update-musics.dto'
import { Musics } from '.'
import { ApiError } from '../../utils/ApiError'
import { validateId } from '../../utils/validateId'
import { readCharacters } from '../characters/characters.service'

export const readMusics = async (id: string) => {
  validateId(id)

  const musics = await Musics.findOne({ _id: id }).populate({
      path: "vocalist_id",
      populate: [{
      path: "home_location_id",
      populate: {
        path: "dominant_species_id"
      }
    },
    {
      path: "species_id"
    },
    {
      path: "weapon_id",
    },]
   }).exec()

  if (!musics) throw new ApiError(httpStatus.NOT_FOUND, `Musics with id "${id}" not found.`)

  return musics
}

export const createMusics = async (musicsBody: createMusicsDTO) => {
  if (
    !musicsBody.name ||
    !musicsBody.album ||
    !musicsBody.duration ||
    !musicsBody.url ||
    !musicsBody.vocalist_id) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'All fields must be filled correctly')
  }

  musicsBody.vocalist_id.forEach(async (vocalist) => {
    validateId(vocalist)
    await readCharacters(vocalist)
  })

  const musics = new Musics(musicsBody)

  return Musics.create(musics)
}

export const readMusicsByName = async (name: string) => {
  const musics = await Musics.findOne({ name })

  return musics
}

export const readAllMusics = async () => {
  return Musics.find().populate({
      path: "vocalist_id",
      populate: [{
      path: "home_location_id",
      populate: {
        path: "dominant_species_id"
      }
    },
    {
      path: "species_id"
    },
    {
      path: "weapon_id",
    },]
   }).sort('-createdAt').exec()
}

export const updateMusics = async (id: string, musicsBody: updateMusicsDTO) => {
  validateId(id)
  await readMusics(id)

  await Musics.updateOne({ _id: id }, musicsBody)

  return readMusics(id)
}

export const deleteMusics = async (id: string) => {
  validateId(id)

  await readMusics(id)

  await Musics.deleteOne({ _id: id })
}
