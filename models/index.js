
const answers = require("./answers");
const User = require("./User");

User.hasOne(answers, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

answers.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, answers };