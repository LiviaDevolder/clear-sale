import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Musics, MusicsDocument } from '../../modules/musics/musics.model'
import { Characters, CharactersDocument } from '../../modules/characters/characters.model'
import { createMusics, deleteMusics, readMusics, readMusicsByName, updateMusics } from '../../modules/musics/musics.service'

interface updatedMusicsDTO extends Partial<MusicsDocument> {
  name: string
  album: string[]
  duration: string
  url: string
  vocalist_id: string[]
}

let mongoServer
let character: CharactersDocument
let character2: CharactersDocument
const musicData: updatedMusicsDTO = {
  name: 'Song',
  album: ['Album1', 'Album2'],
  duration: '3:15',
  url: 'http://example.com/music.mp3',
  vocalist_id: [],
}
let music: MusicsDocument

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  await mongoose.connect(mongoUri)

  character = await new Characters({
    name: 'Character1',
    age: '5000',
    main_color: 'Color1',
    is_fusion: false,
    gender: 'Gender1',
    pronouns: 'Pronouns1',
    height: 100,
    nickname: 'Nickname1',
    image: 'http://example.com/image1.png', home_location_id: new mongoose.Types.ObjectId(), species_id: new mongoose.Types.ObjectId(), weapon_id: new mongoose.Types.ObjectId()
  }).save()

  character2 = await new Characters({
    name: 'Character2',
    age: '6000',
    main_color: 'Color2',
    is_fusion: true,
    gender: 'Gender2',
    pronouns: 'Pronouns2',
    height: 120,
    nickname: 'Nickname2',
    image: 'http://example.com/image2.png', home_location_id: new mongoose.Types.ObjectId(), species_id: new mongoose.Types.ObjectId(), weapon_id: new mongoose.Types.ObjectId()
  }).save()

  musicData.vocalist_id.push(character._id)
  musicData.vocalist_id.push(character2._id)

  music = await createMusics(musicData)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Music Test', () => {
  it('should create and save music successfully', async () => {
    expect(music._id).toBeDefined()
    expect(music.name).toBe(musicData.name)
    expect(music.album).toEqual(expect.arrayContaining(musicData.album))
    expect(music.duration).toBe(musicData.duration)
    expect(music.url).toBe(musicData.url)
    expect(music.vocalist_id).toEqual(expect.arrayContaining(musicData.vocalist_id))
  })

  it('should read music by id successfully', async () => {
    const foundMusic = await readMusics(music._id)

    expect(foundMusic._id).toEqual(music._id)
    expect(foundMusic.name).toBe(musicData.name)
    expect(foundMusic.album).toEqual(expect.arrayContaining(musicData.album))
    expect(foundMusic.duration).toBe(musicData.duration)
    expect(foundMusic.url).toBe(musicData.url)
    expect(foundMusic.vocalist_id[0]["_id"]).toEqual(character._id)
    expect(foundMusic.vocalist_id[1]["_id"]).toEqual(character2._id)
  })

  it('should read music by name successfully', async () => {
    const foundMusic = await readMusicsByName(music.name)

    expect(foundMusic._id).toEqual(music._id)
    expect(foundMusic.name).toBe(musicData.name)
    expect(foundMusic.album).toEqual(expect.arrayContaining(musicData.album))
    expect(foundMusic.duration).toBe(musicData.duration)
    expect(foundMusic.url).toBe(musicData.url)
    expect(foundMusic.vocalist_id[0]["_id"]).toEqual(character._id)
    expect(foundMusic.vocalist_id[1]["_id"]).toEqual(character2._id)
  })

  it('should update music successfully', async () => {
    const updatedMusic = await updateMusics(music._id, {
      name: 'UpdatedName',
      album: ['UpdatedAlbum1', 'UpdatedAlbum2'],
      duration: '4:30',
      url: 'http://example.com/updated.mp3',
      vocalist_id: [character._id.toString(), character2._id.toString()]
    })

    expect(updatedMusic._id).toEqual(music._id)
    expect(updatedMusic.name).toBe('UpdatedName')
    expect(updatedMusic.album).toEqual(expect.arrayContaining(['UpdatedAlbum1', 'UpdatedAlbum2']))
    expect(updatedMusic.duration).toBe('4:30')
    expect(updatedMusic.url).toBe('http://example.com/updated.mp3')
  })

  it('should delete music successfully', async () => {
    await deleteMusics(music._id)
    const foundMusic = await Musics.findById(music._id)

    expect(foundMusic).toBeNull()
  })
})
