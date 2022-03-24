const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class questions extends Model {}

questions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // tabsOrSpaces: {
    //   type: DataTypes.STRING,
    // },
    // codeTest: {
    //   type: DataTypes.STRING,
    // },
    // howMuchComment: {
    //     type: DataTypes.STRING,
    // },
    // timeOfDay: {
    //     type: DataTypes.STRING,
    // },
    // preferedCriticism: {
    //     type: DataTypes.STRING,
    // },
    // music: {
    //     type: DataTypes.STRING,
    // },
    // coffeeOrTea: {
    //     type: DataTypes.STRING,
    // },
    // IntroOrExtro: {
    //     type: DataTypes.STRING,
    // },
    // catsOrDogs: {
    //     type: DataTypes.STRING,
    // },
    // lookingForInBusiness: {
    //     type: DataTypes.STRING,
    // },
    // languagesKnown: {
    //     type: DataTypes.STRING,
    // },
    // collaborativeEnvironment: {
    //     type: DataTypes.STRING,
    // },
    // workedPreviously: {
    //     type: DataTypes.STRING,
    // },
    // mainOS: {
    //     type: DataTypes.STRING,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "questions",
  }
);

module.exports = questions;