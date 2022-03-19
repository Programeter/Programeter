const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Questions extends Model {}

Questions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    questionType1: {
      type: DataTypes.STRING,
    },
    questionType2: {
      type: DataTypes.INTEGER,
    },
    questionType3: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "questions",
  }
);

module.exports = Questions;