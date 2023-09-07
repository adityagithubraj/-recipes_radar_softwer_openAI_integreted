'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipes.belongsToMany(models.User, {
        through: "UserSavedRecipe",
        foreignKey: 'recipe_id',
      });
    }
  }
  Recipes.init({
    title: DataTypes.STRING,
    ingredients: DataTypes.JSONB,
    instructions:  DataTypes.ARRAY(DataTypes.TEXT),
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipes',
  });
  return Recipes;
};