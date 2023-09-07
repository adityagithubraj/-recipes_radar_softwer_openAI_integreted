const express=require('express')
const SaveRecipeRoute=express.Router()
const {UserSavedRecipe}=require("../models")

// ........End-Points.................

SaveRecipeRoute.post('/users/:userId', async (req, res) => {
    try {
      // Get user ID from the route parameters
      const userId = req.params.userId;
  
      // Get recipe ID from the request body
      const { recipeId } = req.body;
  
      // Create a new saved recipe in the database
      const newSavedRecipe = await UserSavedRecipe.create({
        user_id: userId,
        recipe_id: recipeId,
      });
  
      res.status(201).json({ message: 'Saved recipe created successfully', savedRecipe: newSavedRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  // Get all saved recipes for a user with details
  SaveRecipeRoute.get('/users/:userId', async (req, res) => {
    try {
      // Get user ID from the route parameters
      const userId = req.params.userId;
  
      // Retrieve all saved recipes for the user with details
      const savedRecipes = await UserSavedRecipe.findAll({
        where: { user_id: userId },
        include: [{
          model: Recipes,
          as: 'recipe', // Alias for the joined Recipes model
        }],
      });
  
      res.status(200).json({ savedRecipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports={
    SaveRecipeRoute
  }
  