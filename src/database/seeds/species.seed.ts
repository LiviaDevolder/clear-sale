import { Species } from "../../modules/species";
import { createSpeciesDTO } from "../../modules/species/dto/create-species.dto"
import { SpeciesDocument } from "../../modules/species/species.model";
import { readSpeciesByName } from "../../modules/species/species.service";

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
    const species = readSpeciesByName(data[i].name).then(existingSpecies => {
      if (existingSpecies) return existingSpecies

      return new Species(data[i]).save()
    });

    promises.push(species)
  }

  return Promise.all(promises)
}
