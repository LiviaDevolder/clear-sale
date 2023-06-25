import mongoose from 'mongoose';
import Database from '../connect';
import { createSpecies } from './species.seed';

// Importar outras funções de seed aqui

const seedDatabase = async () => {
  const db = Database.getInstance()
  db.connect().then(() => console.log('Connected to database'))

  await Promise.all([
    createSpecies(),
  ])

  mongoose.connection.close()

  console.log('Seeding completed, connection closed');
};

seedDatabase().catch((error) => {
  console.error('Error seeding data: ', error);
});
