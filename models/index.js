const Option = require("./Option");
const User = require("./User");
const Question = require("./Question");
const UserAnswer = require("./UserAnswer");
const Language = require('./Language');
const LanguageLink = require("./LanguageLink");

User.belongsToMany(Option, {
  through: {
    model: UserAnswer,
    unique: false,
  },
  as: 'user_answers',
  onDelete: "CASCADE",
});

Option.belongsToMany(User, {
  through: {
    model: UserAnswer,
    unique: false,
  },
  as: 'answer_users',
  onDelete: "CASCADE",
});

Option.belongsTo(Question, {
  foreignKey: "question_id",
});

Question.hasMany(Option, {
  foreignKey: 'question_id',
  onDelete: "CASCADE",
});

User.belongsToMany(Language, {
  through: {
    model: LanguageLink,
    unique: false,
  },
  as: 'user_languages',
});

Language.belongsToMany(User, {
  through: {
    model: LanguageLink,
    unique: false,
  },
  as: 'language_users',
});

module.exports = { User, Option, Question, UserAnswer, Language, LanguageLink };