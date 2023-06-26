import mongoose from 'mongoose';
import Database from '../connect';
import { createSpecies } from './species.seed';
import { createLocations } from './locations.seed';
import { createWeapons } from './weapons.seed';
import { createCharacters } from './characters.seed';
import { createMusics } from './musics.seed';

const seedDatabase = async () => {
  const db = Database.getInstance()
  db.connect().then(() => console.log('Connected to database'))

  await createSpecies()
  await createWeapons()
  await createLocations()
  await createCharacters()
  await createMusics()

  mongoose.connection.close()

  console.log('Seeding completed, connection closed');
};

seedDatabase().catch((error) => {
  console.error('Error seeding data: ', error);
});
