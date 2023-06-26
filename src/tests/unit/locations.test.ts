import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Locations } from '../../modules/locations'
import { LocationsDocument } from '../../modules/locations/locations.model'
import { createLocations, deleteLocations, readLocations, readLocationsByName, updateLocations } from '../../modules/locations/locations.service'
import { Species } from '../../modules/species'
import { SpeciesDocument } from '../../modules/species/species.model'

interface updatedLocationsDTO extends Partial<LocationsDocument> {
  name: string
  nameUpdated: string
  type: string
  typeUpdated: string
  image: string
  imageUpdated: string
  dominant_species_id: string
}

let mongoServer
const locationsData: updatedLocationsDTO = {
  name: "Quartizine Trio",
  nameUpdated: "Pink Sword",
  type: "Light Cannon",
  typeUpdated: "Sword",
  image: "https://static.wikia.nocookie.net/steven-universe/images/2/27/Light_cannons_2.png",
  imageUpdated: "https://static.wikia.nocookie.net/steven-universe/images/0/0c/NewRoseSword.png",
  dominant_species_id: ""
}
let locations: LocationsDocument
let species: SpeciesDocument

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  await mongoose.connect(mongoUri)

  species = await new Species({ name: 'Human', description: 'Homo Sapiens' }).save()
  locationsData.dominant_species_id = species._id
  locations = await createLocations(locationsData)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Locations Test', () => {
  it('should create and save locations successfully', async () => {
    expect(locations._id).toBeDefined()
    expect(locations.name).toBe(locationsData.name)
    expect(locations.type).toBe(locationsData.type)
    expect(locations.image).toBe(locationsData.image)
    expect(locations.dominant_species_id).toEqual(species._id)
  })

  it('should read locations by id successfully', async () => {
    const foundLocation = await readLocations(locations._id)

    expect(foundLocation._id).toEqual(locations._id)
    expect(foundLocation.name).toBe(locationsData.name)
    expect(foundLocation.type).toBe(locationsData.type)
    expect(foundLocation.image).toBe(locationsData.image)
    expect(foundLocation.dominant_species_id['_id']).toEqual(species._id)
  })

  it('should read locations by name successfully', async () => {
    const foundLocation = await readLocationsByName(locations.name)

    expect(foundLocation._id).toEqual(locations._id)
    expect(foundLocation.name).toBe(locationsData.name)
    expect(foundLocation.type).toBe(locationsData.type)
    expect(foundLocation.image).toBe(locationsData.image)
    expect(foundLocation.dominant_species_id['_id']).toEqual(species._id)
  })

  it('should update locations successfully', async () => {
    const updatedLocation = await updateLocations(locations._id, {
      name: locationsData.nameUpdated,
      type: locationsData.typeUpdated,
      image: locationsData.imageUpdated,
      dominant_species_id: locationsData.dominant_species_id
    })

    expect(updatedLocation._id).toEqual(locations._id)
    expect(updatedLocation.name).toBe(locationsData.nameUpdated)
    expect(updatedLocation.type).toBe(locationsData.typeUpdated)
    expect(updatedLocation.image).toBe(locationsData.imageUpdated)
  })

  it('should delete locations successfully', async () => {
    await deleteLocations(locations._id)
    const foundLocation = await Locations.findById(locationsData._id)

    expect(foundLocation).toBeNull()
  })
})
