import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Species } from '../../modules/species'
import { SpeciesDocument } from '../../modules/species/species.model'
import { createSpecies, deleteSpecies, readSpecies, readSpeciesByName, updateSpecies } from '../../modules/species/species.service'

interface updatedSpeciesDTO extends Partial<SpeciesDocument> {
  name: string
  nameUpdated: string
  description: string
  descriptionUpdated: string
}

let mongoServer
const speciesData: updatedSpeciesDTO = {
  name: 'Gem',
  nameUpdated: 'Human',
  description: 'An extraterrestrial species of "magical", roughly humanoid beings',
  descriptionUpdated: 'A member of the species Homo sapiens'
}
let species: SpeciesDocument

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  await mongoose.connect(mongoUri)

  species = await createSpecies(speciesData)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Species Test', () => {
  it('should create and save species successfully', async () => {
    expect(species._id).toBeDefined()
    expect(species.name).toBe(speciesData.name)
    expect(species.description).toBe(speciesData.description)
  })

  it('should read species by id successfully', async () => {
    const foundSpecies = await readSpecies(species._id)

    expect(foundSpecies._id).toEqual(species._id)
    expect(foundSpecies.name).toBe(speciesData.name)
    expect(foundSpecies.description).toBe(speciesData.description)
  })

  it('should read species by name successfully', async () => {
    const foundSpecies = await readSpeciesByName(species.name)

    expect(foundSpecies._id).toEqual(species._id)
    expect(foundSpecies.name).toBe(speciesData.name)
    expect(foundSpecies.description).toBe(speciesData.description)
  })

  it('should update species successfully', async () => {
    const updatedSpecies = await updateSpecies(species._id, {
      name: speciesData.nameUpdated,
      description: speciesData.descriptionUpdated
    })

    expect(updatedSpecies._id).toEqual(species._id)
    expect(updatedSpecies.name).toBe(speciesData.nameUpdated)
    expect(updatedSpecies.description).toBe(speciesData.descriptionUpdated)
  });

  it('should delete species successfully', async () => {
    await deleteSpecies(species._id)
    const foundSpecies = await Species.findById(species._id)

    expect(foundSpecies).toBeNull();
  });
});
