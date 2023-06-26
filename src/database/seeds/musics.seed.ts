import { readCharactersByName } from "../../modules/characters/characters.service";
import { Musics } from "../../modules/musics";
import { createMusicsDTO } from "../../modules/musics/dto/create-musics.dto"
import { MusicsDocument } from "../../modules/musics/musics.model";
import { readMusicsByName } from "../../modules/musics/musics.service";

export const createMusics = async () => {
  const promises: Promise<MusicsDocument>[] = []

  const steven = await readCharactersByName('Steven Universe')
  const pearl = await readCharactersByName('Pearl')
  const greg = await readCharactersByName('Greg Universe')

  const data: createMusicsDTO[] = [
    {
      name: "Giant Woman",
      album: ["Soundtrack: Volume 1"],
      duration: "00:56",
      url: "https://youtu.be/U9oUEvZ_O9Q",
      vocalist_id: [steven.id],
    },
    {
      name: "It's Over Isn't It",
      album: ["Soundtrack: Volume 1"],
      duration: "02:20",
      url: "https://youtu.be/DzYdIdqfbSE",
      vocalist_id: [pearl.id],
    },
    {
      name: "Mr. Universe",
      album: ["Steven Universe Future(Original Soundtrack)"],
      duration: "01:06",
      url: "https://youtu.be/VZ8yGEivxMc",
      vocalist_id: [greg.id],
    },
    {
      name: "Strong in the Real Way",
      album: ["Soundtrack: Volume 1"],
      duration: "01:41",
      url: "https://youtu.be/rvTFIBrhb1E",
      vocalist_id: [pearl.id, steven.id],
    },
  ]

  for (let i = 0; i < data.length; i++) {
    const musics = readMusicsByName(data[i].name).then(existingMusics => {
      if (existingMusics) return existingMusics;

      return new Musics(data[i]).save()
    })

    promises.push(musics)
  }

  return Promise.all(promises)
}
