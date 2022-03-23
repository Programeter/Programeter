const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class answers extends Model {}

answers.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    answered_by_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    answer: {
      type: DataTypes.TEXT,
    },
    answers_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'questions',
        key: 'question_id',
        unique: false
      }
    },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "answers",
  }
);

module.exports = answers;