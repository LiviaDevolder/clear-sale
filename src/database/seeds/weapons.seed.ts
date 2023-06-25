import { Weapons } from "../../modules/weapons";
import { createWeaponsDTO } from "../../modules/weapons/dto/create-weapons.dto"
import { WeaponsDocument } from "../../modules/weapons/weapons.model";
import { readWeaponsByName } from "../../modules/weapons/weapons.service";

export const createWeapons = () => {
  const promises: Promise<WeaponsDocument>[] = []
  const data: createWeaponsDTO[] = [
    {
      name: "Spiraled Pink Shield",
      type: "Shield",
      image: "https://static.wikia.nocookie.net/steven-universe/images/1/1d/Stevens_shield.png"
    },
    {
      name: "Multi-Tailed Dark Violet Whip",
      type: "Whip",
      image: "https://static.wikia.nocookie.net/steven-universe/images/0/0c/NewWhip.png"
    },
    {
      name: "Glowing Blade Spear",
      type: "Spear",
      image: "https://static.wikia.nocookie.net/steven-universe/images/9/97/Pearl%27s_SpearPNG.png"
    },
    {
      name: "Electric Whip",
      type: "Whip",
      image: "https://static.wikia.nocookie.net/steven-universe/images/7/7b/Holly_Blue_Agate_Whip.png"
    },
    {
      name: "Brown Yo-Yo",
      type: "Yo-Yo",
      image: "https://static.wikia.nocookie.net/steven-universe/images/8/82/Smokey_quartz_yoyo_weapon.png"
    },
    {
      name: "Guitar",
      type: "Guitar",
      image: "https://static.wikia.nocookie.net/steven-universe/images/b/b6/Greg%27s_guitar-0.png"
    }
  ]

  for (let i = 0; i < data.length; i++) {
    const weapons = readWeaponsByName(data[i].name).then(existingWeapons => {
      if (existingWeapons) return existingWeapons

      return new Weapons(data[i]).save()
    });

    promises.push(weapons)
  }

  return Promise.all(promises)
}
