import mongoose, { Schema, Model, Document } from 'mongoose'
import { createMusicsDTO } from './dto/create-musics.dto'

type MusicsDocument = Document & createMusicsDTO

type MusicsInput = {
  name: MusicsDocument['name']
  album: MusicsDocument['album']
  duration: MusicsDocument['duration']
  url: MusicsDocument['url']
  vocalist_id: MusicsDocument['vocalist_id']
}

const musicsSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    album: {
      type: Schema.Types.String,
      required: true,
    },
    duration: {
      type: Schema.Types.String,
      required: true,
    },
    url: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    vocalist_id: {
      type: Schema.Types.ObjectId,
      ref: 'Characters',
      required: true,
      index: true,
    },
  },
  {
    collection: 'musics',
    timestamps: true,
  },
)

const Musics: Model<MusicsDocument> = mongoose.model<MusicsDocument>('Musics', musicsSchema)

export { Musics, MusicsInput, MusicsDocument }
