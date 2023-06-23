import { createWeaponsDTO } from "./create-weapons.dto"

export interface updateWeaponsDTO extends Partial<createWeaponsDTO> {
  name: string
  type: string
  image: string
}
