const answers = require("./answers");
const users = require("./users");
const questions = require("./questions");
const useranswers = require("./useranswers");
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
  foreignKey: "answers_id",
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