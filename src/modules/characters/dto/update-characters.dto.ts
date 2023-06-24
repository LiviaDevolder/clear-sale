import { createCharactersDTO } from "./create-characters.dto"

export interface updateCharactersDTO extends Partial<createCharactersDTO> {
  name: string
  age: string
  main_color: string
  is_fusion: boolean
  gender: string
  pronouns: string
  height: number
  nickname: string
  home_location_id: string
  species_id: string
  weapon_id: string
}
