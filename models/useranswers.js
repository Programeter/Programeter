const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class useranswers extends Model {}

useranswers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
      answer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'answers',
            key: 'answer_id',
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

module.exports = useranswers;