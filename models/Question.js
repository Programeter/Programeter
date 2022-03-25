const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Question extends Model {}

Question.init(
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
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
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
    modelName: "question",
  }
);

module.exports = Question;