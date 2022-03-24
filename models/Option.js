const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Option extends Model {}

Option.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    option: {
      type: DataTypes.STRING,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'option',
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
    modelName: "options",
  }
);

module.exports = Option;