'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.belongsTo(models.type, { // models.type = dans le dossier models tu cherche le model type
        as:"type",
        foreignKey: "type_id",
      })
    }
  }
  books.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false      
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull:  false,
      validate:{
        notEmpty: true
      }
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:"type",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'books', // le nom du model
    tableName: 'books', // nom de la table
    // underscored: true,
    timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at'
  });
  return books;
};