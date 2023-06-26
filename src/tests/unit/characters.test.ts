import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Characters } from '../../modules/characters'
import { LocationsDocument } from '../../modules/locations/locations.model'
import { SpeciesDocument } from '../../modules/species/species.model'
import { WeaponsDocument } from '../../modules/weapons/weapons.model'
import { CharactersDocument } from '../../modules/characters/characters.model'
import { createCharacters, deleteCharacters, readCharacters, readCharactersByName, updateCharacters } from '../../modules/characters/characters.service'
import { createSpecies } from '../../modules/species/species.service'
import { createLocations } from '../../modules/locations/locations.service'
import { createWeapons } from '../../modules/weapons/weapons.service'

interface updatedLocationsDTO extends Partial<LocationsDocument> {
  name: string
  age: string
  main_color: string
  is_fusion: boolean
  gender: string
  pronouns: string
  height: number
  nickname: string
  image: string
  home_location_id: string
  species_id: string
  weapon_id: string
}

let mongoServer
let species: SpeciesDocument
let location: LocationsDocument
let weapon: WeaponsDocument
const charactersData: updatedLocationsDTO = {
  name: 'Amethyst',
  age: '5000',
  main_color: 'Purple',
  is_fusion: false,
  gender: 'Female',
  pronouns: 'She/Her',
  height: 127,
  nickname: 'Ame',
  image: 'http://example.com/amethyst.png',
  home_location_id: '',
  species_id: '',
  weapon_id: ''
}
let characters: CharactersDocument

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  await mongoose.connect(mongoUri)

  species = await createSpecies({ name: 'Gem', description: 'A race of aliens' })
  location = await createLocations({ name: 'Earth', type: 'Planet', image: 'http://example.com/earth.png', dominant_species_id: species._id })
  weapon = await createWeapons({ name: 'Purple Whip', type: 'Whipe', image: 'http://example.com/whip.png' })

  charactersData.species_id = species._id.toString()
  charactersData.home_location_id = location._id.toString()
  charactersData.weapon_id = weapon._id.toString()

  characters = await createCharacters(charactersData)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Characters Test', () => {
  it('should create and save characters successfully', async () => {
    expect(characters._id).toBeDefined()
    expect(characters.name).toBe(charactersData.name)
    expect(characters.age).toBe(charactersData.age)
    expect(characters.main_color).toBe(charactersData.main_color)
    expect(characters.is_fusion).toBe(charactersData.is_fusion)
    expect(characters.gender).toBe(charactersData.gender)
    expect(characters.pronouns).toBe(charactersData.pronouns)
    expect(characters.height).toBe(charactersData.height)
    expect(characters.nickname).toBe(charactersData.nickname)
    expect(characters.image).toBe(charactersData.image)
    expect(characters.species_id).toEqual(species._id)
    expect(characters.home_location_id).toEqual(location._id)
    expect(characters.weapon_id).toEqual(weapon._id)
  })

  it('should read characters by id successfully', async () => {
    const foundCharacter = await readCharacters(characters._id)

    expect(foundCharacter._id).toEqual(characters._id)
    expect(foundCharacter.name).toBe(charactersData.name)
    expect(foundCharacter.age).toBe(charactersData.age)
    expect(foundCharacter.main_color).toBe(charactersData.main_color)
    expect(foundCharacter.is_fusion).toBe(charactersData.is_fusion)
    expect(foundCharacter.gender).toBe(charactersData.gender)
    expect(foundCharacter.pronouns).toBe(charactersData.pronouns)
    expect(foundCharacter.height).toBe(charactersData.height)
    expect(foundCharacter.nickname).toBe(charactersData.nickname)
    expect(foundCharacter.image).toBe(charactersData.image)
    expect(foundCharacter.species_id['_id']).toEqual(species._id)
    expect(foundCharacter.home_location_id['_id']).toEqual(location._id)
    expect(foundCharacter.weapon_id['_id']).toEqual(weapon._id)
  })

  it('should read characters by name successfully', async () => {
    const foundCharacter = await readCharactersByName(characters.name)

    expect(foundCharacter._id).toEqual(characters._id)
    expect(foundCharacter.name).toBe(charactersData.name)
    expect(foundCharacter.age).toBe(charactersData.age)
    expect(foundCharacter.main_color).toBe(charactersData.main_color)
    expect(foundCharacter.is_fusion).toBe(charactersData.is_fusion)
    expect(foundCharacter.gender).toBe(charactersData.gender)
    expect(foundCharacter.pronouns).toBe(charactersData.pronouns)
    expect(foundCharacter.height).toBe(charactersData.height)
    expect(foundCharacter.nickname).toBe(charactersData.nickname)
    expect(foundCharacter.image).toBe(charactersData.image)
    expect(foundCharacter.species_id['_id']).toEqual(species._id)
    expect(foundCharacter.home_location_id['_id']).toEqual(location._id)
    expect(foundCharacter.weapon_id['_id']).toEqual(weapon._id)
  })

  it('should update characters successfully', async () => {
    const updatedCharacter = await updateCharacters(characters._id, {
      name: 'UpdatedName',
      age: '6000',
      main_color: 'UpdatedColor',
      is_fusion: true,
      gender: 'UpdatedGender',
      pronouns: 'UpdatedPronouns',
      height: 150,
      nickname: 'UpdatedNickname',
      image: 'http://example.com/updated.png',
      home_location_id: location.id,
      species_id: species.id,
      weapon_id: weapon.id
    })

    expect(updatedCharacter._id).toEqual(characters._id)
    expect(updatedCharacter.name).toBe('UpdatedName')
    expect(updatedCharacter.age).toBe('6000')
    expect(updatedCharacter.main_color).toBe('UpdatedColor')
    expect(updatedCharacter.is_fusion).toBe(true)
    expect(updatedCharacter.gender).toBe('UpdatedGender')
    expect(updatedCharacter.pronouns).toBe('UpdatedPronouns')
    expect(updatedCharacter.height).toBe(150)
    expect(updatedCharacter.nickname).toBe('UpdatedNickname')
    expect(updatedCharacter.image).toBe('http://example.com/updated.png')
  })

  it('should delete characters successfully', async () => {
    await deleteCharacters(characters._id)
    const foundCharacter = await Characters.findById(characters._id)

    expect(foundCharacter).toBeNull()
  })
})
