import mongoose, { Schema, Model, Document } from 'mongoose'
import { createCharactersDTO } from './dto/create-characters.dto'

type CharactersDocument = Document & createCharactersDTO

type CharactersInput = {
  name: CharactersDocument['name']
  age: CharactersDocument['age']
  main_color: CharactersDocument['main_color']
  is_fusion: CharactersDocument['is_fusion']
  gender: CharactersDocument['gender']
  pronouns: CharactersDocument['pronouns']
  height: CharactersDocument['height']
  nickname: CharactersDocument['nickname']
  home_location_id: CharactersDocument['home_location_id']
  species_id: CharactersDocument['species_id']
  weapon_id: CharactersDocument['weapon_id']
}

const charactersSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    age: {
      type: Schema.Types.String,
      required: true,
    },
    main_color: {
      type: Schema.Types.String,
      required: true,
    },
    is_fusion: {
      type: Schema.Types.Boolean,
      required: true,
    },
    gender: {
      type: Schema.Types.String,
      required: true,
    },
    pronouns: {
      type: Schema.Types.String,
      required: true,
    },
    height: {
      type: Schema.Types.Number,
      required: true,
    },
    nickname: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    home_location_id: {
      type: Schema.Types.ObjectId,
      ref: 'Locations',
      required: true,
      index: true,
    },
    species_id: {
      type: Schema.Types.ObjectId,
      ref: 'Species',
      required: true,
      index: true,
    },
    weapon_id: {
      type: Schema.Types.ObjectId,
      ref: 'Weapons',
      required: true,
      index: true,
    },
  },
  {
    collection: 'locations',
    timestamps: true,
  },
)

const Characters: Model<CharactersDocument> = mongoose.model<CharactersDocument>('Characters', charactersSchema)

export { Characters, CharactersInput, CharactersDocument }
