const answers = require("./answers");
const users = require("./users");
const questions = require("./questions")
const useranswers = require("./useranswers")
const Language = require("./Language")
const LanguageLink = require("./LanguageLink")

users.hasOne(answers, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

answers.belongsTo(users, {
  foreignKey: "user_id",
});

questions.belongsToMany(users, {
  //struggle.
});

useranswers.belongsToMany(useranswers, {
  //continue to struggle.
}),

module.exports = { users, answers, questions, useranswers, LanguageLink};