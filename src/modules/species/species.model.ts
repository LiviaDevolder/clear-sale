import mongoose, { Schema, Model, Document } from 'mongoose';

type SpeciesDocument = Document & {
  name: string;
  description: string | null;
};

type SpeciesInput = {
  name: SpeciesDocument['name'];
  description: SpeciesDocument['description'];
};

const speciesSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
      default: null,
    },
  },
  {
    collection: 'species',
    timestamps: true,
  },
);

const Species: Model<SpeciesDocument> = mongoose.model<SpeciesDocument>('Species', speciesSchema)

export { Species, SpeciesInput, SpeciesDocument };
