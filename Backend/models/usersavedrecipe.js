'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSavedRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSavedRecipe.init({
    user_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSavedRecipe',
  });
  return UserSavedRecipe;
};