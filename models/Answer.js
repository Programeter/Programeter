const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Answer extends Model {}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    answer: {
      type: DataTypes.TEXT,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'question',
        key: 'id',
        unique: false
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

module.exports = Answer;