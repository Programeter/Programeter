const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class answers extends Model {}

answers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    answerText: {
      type: DataTypes.STRING,
    },
    answerValue: {
      type: DataTypes.INTEGER,
    },
    question_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'question',
        key: 'id',
        unique: false,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "answer",
  }
);

module.exports = answers;