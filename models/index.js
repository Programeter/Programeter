const option = require("./Option");
const users = require("./User");
const questions = require("./Question");
const useranswers = require("./UserAnswer");
const languages = require('./Language');
const languagelink = require("./LanguageLink");

users.belongsToMany(option, {
  through: {
    model: useranswers,
    unique: false,
  },
  as: 'user_answers',
  onDelete: "CASCADE",
});

option.belongsToMany(users, {
  through: {
    model: useranswers,
    unique: false,
  },
  as: 'answer_users',
  onDelete: "CASCADE",
});

option.belongsTo(questions, {
  foreignKey: "question_id",
});

questions.hasMany(option, {
  foreignKey: 'question_id',
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

module.exports = { users, option, questions, useranswers, languages, languagelink };