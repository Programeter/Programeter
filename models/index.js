const answers = require("./Answer");
const users = require("./User");
const questions = require("./Question");
const useranswers = require("./UserAnswer");
const languages = require('./Language');
const languagelink = require("./LanguageLink");

users.belongsToMany(answers, {
  through: {
    model: useranswers,
    unique: false,
  },
  as: 'user_answers',
  onDelete: "CASCADE",
});

answers.belongsToMany(users, {
  through: {
    model: useranswers,
    unique: false,
  },
  as: 'answer_users',
  onDelete: "CASCADE",
});

answers.belongsTo(questions, {
  foreignKey: "question_id",
});

questions.hasMany(answers, {
  foreignKey: 'answers_id',
  onDelete: "CASCADE",
});

users.belongsToMany(languages, {
  through: {
    model: languagelink,
    unique: false,
  },
  as: 'user_languages',
});

languages.belongsToMany(users, {
  through: {
    model: languagelink,
    unique: false,
  },
  as: 'language_users',
});

module.exports = { users, answers, questions, useranswers, languages, languagelink };