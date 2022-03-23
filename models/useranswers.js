const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class useranswers extends Model {}

useranswers.init(
  {
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
      answer: {
        type: DataTypes.TEXT,
        references: {
            model: 'answers',
            key: 'answer',
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