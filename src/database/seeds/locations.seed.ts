import { Locations } from "../../modules/locations";
import { createLocationsDTO } from "../../modules/locations/dto/create-locations.dto"
import { LocationsDocument } from "../../modules/locations/locations.model";
import { readLocationsByName } from "../../modules/locations/locations.service";
import { readSpeciesByName } from "../../modules/species/species.service";

export const createLocations = async () => {
  const promises: Promise<LocationsDocument>[] = []

  const gemSpecies = await readSpeciesByName('Gem')
  const humanSpecies = await readSpeciesByName('Human')

  const data: createLocationsDTO[] = [
    {
      name: "Earth",
      type: "Planet",
      image: "https://static.wikia.nocookie.net/steven-universe/images/1/1e/Earth.png",
      dominant_species_id: humanSpecies.id
    },
    {
      name: "Gem Homeworld",
      type: "Planet",
      image: "https://static.wikia.nocookie.net/steven-universe/images/2/2f/Legs_From_Here_to_Homeworld_366.png",
      dominant_species_id: gemSpecies.id
    },
    {
      name: "Beach City",
      type: "City",
      image: "https://static.wikia.nocookie.net/steven-universe/images/4/4f/Beach_City_Color_Key.jpg",
      dominant_species_id: humanSpecies.id
    },
    {
      name: "Kindergarten",
      type: "Rocky facilities",
      image: "https://static.wikia.nocookie.net/steven-universe/images/b/b8/On_the_run_21.png",
      dominant_species_id: humanSpecies.id
    },
    {
      name: "Little Homeworld",
      type: "Settlement",
      image: "https://static.wikia.nocookie.net/steven-universe/images/b/b3/Little_Graduation_208.png",
      dominant_species_id: gemSpecies.id
    },
  ]

  for (let i = 0; i < data.length; i++) {
    const locations = readLocationsByName(data[i].name).then(existingLocations => {
      if (existingLocations) return existingLocations;

      return new Locations(data[i]).save()
    })

    promises.push(locations)
  }

  return Promise.all(promises)
}
