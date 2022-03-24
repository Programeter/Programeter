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
        model: 'user',
        key: 'id',
      },
    },
      option_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'option',
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