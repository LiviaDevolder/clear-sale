import mongoose, { Schema, Model, Document } from 'mongoose'
import { createWeaponsDTO } from './dto/create-weapons.dto'

type WeaponsDocument = Document & createWeaponsDTO

type WeaponsInput = {
  name: WeaponsDocument['name']
  type: WeaponsDocument['type']
  image: WeaponsDocument['image']
}

const weaponsSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
  },
  {
    collection: 'weapons',
    timestamps: true,
  },
)

const Weapons: Model<WeaponsDocument> = mongoose.model<WeaponsDocument>('Weapons', weaponsSchema)

export { Weapons, WeaponsInput, WeaponsDocument }
