const express=require('express')
const axios=require("axios")
const RecipeRoute=express.Router()
const {Recipes}=require("../models")

// ........End-Points.................

// Getting Recipe From ChatGPT API

RecipeRoute.post("/get",async(req,res)=>{
    console.log("Starting")
    try {
            const {include,exclude}=req.body

            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    model: "text-davinci-003",
                    prompt: `
                    [Act as an API]
                    Please share a Recipe in the below mentioned structure that meet the following criteria:
                    **
                    Recipe Criteria:
                    Should contain the following ingredients:${include.join(", ")}
                    Should avoid the following ingredients:${exclude.join(", ")}
                    **
                    
                    The Recipe should have the following structure:
                    
                    *json*
                    {
                        "image": "URL to recipe image",
                        "title": "Recipe Title",
                        "ingredients": [
                            {"name": "ingredient name", "quantity": "quantity/amount"},
                            {"name": "ingredient name", "quantity": "quantity/amount"},
                            ...
                        ],
                        "instructions":[
                            "Step1","Step2",...
                        ]
                    }
                    While Sending the Response, Act as an API and strictly follow the structure provided above and only return data in json format.`,
                    max_tokens: 1000,
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );
            console.log("Mid")
            const responseData = response.data.choices[0].text.trim();
            console.log(responseData)
            res.json({ responseData });
    } catch (error) {
        console.error('Error', error.message);
        res.status(500).json({ error: 'Error' });
    }
})

// ...........Saving The recipe fetched from ChatGPT in DB

RecipeRoute.post('/save', async (req, res) => {
    try {
      // Get recipe data from the request body
      const { title, ingredients, instructions, image } = req.body;
  
      // Create a new recipe in the database
      const newRecipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        image,
      });
  
      res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });










module.exports={
    RecipeRoute
}