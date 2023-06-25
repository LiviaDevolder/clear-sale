import { Characters } from "../../modules/characters";
import { createCharactersDTO } from "../../modules/characters/dto/create-characters.dto"
import { CharactersDocument } from "../../modules/characters/characters.model";
import { readLocationsByName } from "../../modules/locations/locations.service";
import { readSpeciesByName } from "../../modules/species/species.service";
import { readWeaponsByName } from "../../modules/weapons/weapons.service";
import { readCharactersByName } from "../../modules/characters/characters.service";

export const createCharacters = async () => {
  const promises: Promise<CharactersDocument>[] = []

  const gemSpecies = await readSpeciesByName('Gem')
  const humanSpecies = await readSpeciesByName('Human')
  const halfSpecies = await readSpeciesByName('Half-human half-gem')

  const earth = await readLocationsByName('Earth')
  const gemHomeworld = await readLocationsByName('Gem Homeworld')
  const kindergarten = await readLocationsByName('Kindergarten')

  const stevensShield = await readWeaponsByName('Spiraled Pink Shield')
  const amethystWhip = await readWeaponsByName('Multi-Tailed Dark Violet Whip')
  const guitar = await readWeaponsByName('Guitar')
  const yoyo = await readWeaponsByName('Brown Yo-Yo')
  const spear = await readWeaponsByName('Glowing Blade Spear')

  const data: createCharactersDTO[] = [
    {
      name: "Steven Universe",
      age: "16",
      main_color: "Pink",
      is_fusion: false,
      gender: "Male",
      pronouns: "He/Him",
      height: 168,
      nickname: "Cutie Pie",
      image: "https://static.wikia.nocookie.net/steven-universe/images/1/12/StevenUniverse16_-2-_By_TheOffColors.png",
      home_location_id: earth.id,
      species_id: halfSpecies.id,
      weapon_id: stevensShield.id
    },
    {
      name: "Amethyst",
      age: "1000",
      main_color: "Purple",
      is_fusion: false,
      gender: "Agender",
      pronouns: "She/Her",
      height: 144,
      nickname: "8XM",
      image: "https://static.wikia.nocookie.net/steven-universe/images/4/4b/Amethyst_CYM_Outfit.png",
      home_location_id: kindergarten.id,
      species_id: gemSpecies.id,
      weapon_id: amethystWhip.id
    },
    {
      name: "Greg Universe",
      age: "42",
      main_color: "White",
      is_fusion: false,
      gender: "Male",
      pronouns: "He/Him",
      height: 193,
      nickname: "Guitar Daddy",
      image: "https://static.wikia.nocookie.net/steven-universe/images/9/92/Greg_PantsCut.png",
      home_location_id: earth.id,
      species_id: humanSpecies.id,
      weapon_id: guitar.id
    },
    {
      name: "Smoky Quartz",
      age: "1000",
      main_color: "Brown",
      is_fusion: true,
      gender: "Agender",
      pronouns: "They/Them",
      height: 260,
      nickname: "The Yo-you",
      image: "https://static.wikia.nocookie.net/steven-universe/images/6/60/Smoky_Quartz_3.png",
      home_location_id: earth.id,
      species_id: halfSpecies.id,
      weapon_id: yoyo.id
    },
    {
      name: "Pearl",
      age: "8000",
      main_color: "Light Blue",
      is_fusion: false,
      gender: "Agender",
      pronouns: "She/Her",
      height: 193,
      nickname: "Renegade Pearl",
      image: "https://static.wikia.nocookie.net/steven-universe/images/3/38/CYM_Pearl_Request_by_RylerGamerDBS.png",
      home_location_id: gemHomeworld.id,
      species_id: gemSpecies.id,
      weapon_id: spear.id
    },
  ]

  for (let i = 0; i < data.length; i++) {
    const characters = readCharactersByName(data[i].name).then(existingCharacters => {
      if (existingCharacters) return existingCharacters;

      return new Characters(data[i]).save()
    })

    promises.push(characters)
  }

  return Promise.all(promises)
}
