const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserAnswer extends Model {}

UserAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
      answer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'answers',
            key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "useranswers",
  }
);

module.exports = UserAnswer;