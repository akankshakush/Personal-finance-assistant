const sequelize = require('./config/database');
const User = require('./models/user');

async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    // Sync all models — creates tables if they don't exist
    await sequelize.sync({ force: true });  // force: true drops tables first, be careful

    console.log('All models synced successfully!');
    process.exit(0); // exit script
  } catch (error) {
    console.error('Error syncing models:', error);
    process.exit(1);
  }
}

syncModels();
