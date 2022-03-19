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
    answerType1: {
      type: DataTypes.STRING,
    },
    answerType2: {
      type: DataTypes.INTEGER,
    },
    answerType3: {
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
    modelName: "answer",
  }
);

module.exports = answers;