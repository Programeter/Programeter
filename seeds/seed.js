const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const questionData = require('./QuestionData');
const optionData = require('./optionsData');
const languageData = require('./languageData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
 
  const questions = await User.bulkCreate(questionData, {
    individualHooks: true,
    returning: true,
  });
  
  const options = await User.bulkCreate(optionData, {
    individualHooks: true,
    returning: true,
  });
  
  const language = await User.bulkCreate(languageData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await UserAnswer.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: questions[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: options[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: language[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);

};

seedDatabase();
