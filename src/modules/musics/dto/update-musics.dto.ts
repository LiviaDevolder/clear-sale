import { createMusicsDTO } from "./create-musics.dto"

export interface updateMusicsDTO extends Partial<createMusicsDTO> {
  name: string
  album: string[]
  duration: string
  url: string
  vocalist_id: string
}
