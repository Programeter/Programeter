const sequelize = require('../config/connection');
const { User, Question, Option, Language, UserAnswer, LanguageLink } = require('../models');

const userData = require('./userData.json');
const questionData = require('./questionData.json');
const optionData = require('./optionsData.json');
const languageData = require('./languageData.json');

const seedDatabase = async () => {
  let users = [];
  let questions = [];
  let options = [];
  let languages = [];

  await sequelize.sync();

  for(const i in userData) { const user = await User.create(userData[i], {
      individualHooks: true,
      returning: true,
    });
    users.push(user);
  }
 
  for (const i in questionData) { const question = await Question.create(questionData[i], {
      individualHooks: true,
      returning: true,
    });
    questions.push(question);
  }
  
  for (const i in optionData) { const option = await Option.create(optionData[i], {
      individualHooks: true,
      returning: true,
    });
    options.push(option);
  }
  
  for (const i in languageData) { const language =  await Language.create(languageData[i], {
      individualHooks: true,
      returning: true,
    });
    languages.push(language);
  }

  // generate random answers and languages for each user
  for (const user of users) {
    // generate random answers for each question
    for (const question of questions) { 
      const options = await Option.findAll({
        where: {
          question_id: question.id
        }
      });
      await UserAnswer.create({
        user_id: user.id,
        option_id: options[Math.floor(Math.random()*options.length)].id
      });
    }

    // give each user three random languages
    for (let i = 1; i <= 3; i++) {
      await LanguageLink.create({
        user_id: user.id,
        language_id: languages[Math.floor(Math.random() * languages.length)].id
      });
    }
  }
  
  process.exit(0);

};

seedDatabase();
