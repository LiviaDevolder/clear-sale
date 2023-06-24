import mongoose, { Schema, Model, Document } from 'mongoose'

type LocationsDocument = Document & {
  name: string
  type: string
  image: string
  dominant_species_id: string
}

type LocationsInput = {
  name: LocationsDocument['name']
  type: LocationsDocument['type']
  image: LocationsDocument['image']
}

const locationsSchema = new Schema(
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
    dominant_species_id: {
      type: Schema.Types.ObjectId,
      ref: 'Species',
      required: true,
      index: true,
    },
  },
  {
    collection: 'locations',
    timestamps: true,
  },
)

const Locations: Model<LocationsDocument> = mongoose.model<LocationsDocument>('Locations', locationsSchema)

export { Locations, LocationsInput, LocationsDocument }
