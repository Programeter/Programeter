
const Questions = require("./Questions");
const User = require("./User");

User.hasOne(Questions, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Questions.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Questions };