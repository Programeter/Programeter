const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LanguageLink extends Model {}

LanguageLink.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false,
            }
        },
        language_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'language',
                key: 'id',
                unique: false,
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "languagelink",
    },
);

module.exports = LanguageLink;