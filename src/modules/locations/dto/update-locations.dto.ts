import { createLocationsDTO } from "./create-locations.dto"

export interface updateLocationsDTO extends Partial<createLocationsDTO> {
  name: string
  type: string
  image: string
  dominant_species_id: string
}
