import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Weapons } from '../../modules/weapons'
import { WeaponsDocument } from '../../modules/weapons/weapons.model'
import { createWeapons, deleteWeapons, readWeapons, readWeaponsByName, updateWeapons } from '../../modules/weapons/weapons.service'

interface updatedWeaponsDTO extends Partial<WeaponsDocument> {
  name: string
  nameUpdated: string
  type: string
  typeUpdated: string
  image: string
  imageUpdated: string
}

let mongoServer
const weaponsData: updatedWeaponsDTO = {
  name: "Quartizine Trio",
  nameUpdated: "Pink Sword",
  type: "Light Cannon",
  typeUpdated: "Sword",
  image: "https://static.wikia.nocookie.net/steven-universe/images/2/27/Light_cannons_2.png",
  imageUpdated: "https://static.wikia.nocookie.net/steven-universe/images/0/0c/NewRoseSword.png"
}
let weapons: WeaponsDocument

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  await mongoose.connect(mongoUri)

  weapons = await createWeapons(weaponsData)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Weapons Model Test', () => {
  it('should create and save weapons successfully', async () => {
    expect(weapons._id).toBeDefined()
    expect(weapons.name).toBe(weaponsData.name)
    expect(weapons.type).toBe(weaponsData.type)
    expect(weapons.image).toBe(weaponsData.image)
  })

  it('should read weapons by id successfully', async () => {
    const foundWeapon = await readWeapons(weapons._id)

    expect(foundWeapon._id).toEqual(weapons._id)
    expect(foundWeapon.name).toBe(weaponsData.name)
    expect(foundWeapon.type).toBe(weaponsData.type)
    expect(foundWeapon.image).toBe(weaponsData.image)
  })

  it('should read weapons by name successfully', async () => {
    const foundWeapon = await readWeaponsByName(weapons.name)

    expect(foundWeapon._id).toEqual(weapons._id)
    expect(foundWeapon.name).toBe(weaponsData.name)
    expect(foundWeapon.type).toBe(weaponsData.type)
    expect(foundWeapon.image).toBe(weaponsData.image)
  })

  it('should update weapons successfully', async () => {
    const updatedWeapon = await updateWeapons(weapons._id, {
      name: weaponsData.nameUpdated,
      type: weaponsData.typeUpdated,
      image: weaponsData.imageUpdated
    })

    expect(updatedWeapon._id).toEqual(weapons._id)
    expect(updatedWeapon.name).toBe(weaponsData.nameUpdated)
    expect(updatedWeapon.type).toBe(weaponsData.typeUpdated)
    expect(updatedWeapon.image).toBe(weaponsData.imageUpdated)
  })

  it('should delete weapons successfully', async () => {
    await deleteWeapons(weapons._id)
    const foundSpecies = await Weapons.findById(weapons._id)

    expect(foundSpecies).toBeNull()
  })
})
