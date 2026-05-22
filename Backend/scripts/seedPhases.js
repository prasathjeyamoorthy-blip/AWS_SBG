require('dotenv').config();
const mongoose = require('mongoose');
const Phase = require('../models/Phase');

const mockPhases = [
  {
    phase_name: 'Registration',
    phase_order: 1,
    is_active: true, // Make registration active by default
    start_date: new Date(),
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  {
    phase_name: 'Idea Submission',
    phase_order: 2,
    is_active: false,
    start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  },
  {
    phase_name: 'Idea Screening',
    phase_order: 3,
    is_active: false,
    start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    end_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
  }
];

const seedPhases = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grand_pirate_voyage';
    console.log(`Connecting to database: ${mongoUri} for seeding...`);
    await mongoose.connect(mongoUri);

    // Delete existing phases to avoid unique index duplication on rerun
    await Phase.deleteMany();
    console.log('Cleared existing hackathon phases.');

    // Insert mock phases
    await Phase.insertMany(mockPhases);
    console.log('Successfully seeded standard hackathon phases!');

    await mongoose.disconnect();
    console.log('Database disconnected. Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding phases:', error);
    process.exit(1);
  }
};

seedPhases();
