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
      books.belongsTo(models.type, {
        foreignKey: "type_id",
        as:"type",
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