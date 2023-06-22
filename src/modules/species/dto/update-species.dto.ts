import { createSpeciesDTO } from "./create-species.dto"

export interface updateSpeciesDTO extends Partial<createSpeciesDTO> {
  name: string
  description: string
}
