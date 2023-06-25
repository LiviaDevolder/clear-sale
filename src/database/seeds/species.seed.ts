import { Species } from "../../modules/species";
import { createSpeciesDTO } from "../../modules/species/dto/create-species.dto"
import { SpeciesDocument } from "../../modules/species/species.model";

export const createSpecies = () => {
  const promises: Promise<SpeciesDocument>[] = []
  const data: createSpeciesDTO[] = [
    {
      name: "Gem",
      description: "An extraterrestrial species of \"magical\", roughly humanoid beings"
    },
    {
      name: "Human",
      description: "A member of the species Homo sapiens"
    },
    {
      name: "Half-human half-gem",
      description: "Fusions or descendents from humans with gems."
    }
  ]

  for (let i = 0; i < data.length; i++) {
    const species = new Species(data[i])

    promises.push(species.save());
  }

  return Promise.all(promises);
}
