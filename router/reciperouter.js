const express=require('express')
const axios=require("axios")
const RecipeRoute=express.Router()

// ........End-Points.................

RecipeRoute.post("/get",async(req,res)=>{
    console.log("Starting")
    try {
            const {include,exclude}=req.body

            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    model: "text-davinci-003",
                    prompt: `Please generate an array of at least 3 recipes that meet the following criteria:
                    **
                    Recipe Details:
                    Should contain the following ingredients:${include}
                    Should avoid the following ingredients:${exclude}
                    **
                    
                    Each recipe should have the following structure:
                    
                    json
                    {
                        "image": "URL to recipe image",
                        "title": "Recipe Title",
                        "ingredients": [
                            {"name": "ingredient name", "quantity": "quantity/amount"},
                            {"name": "ingredient name", "quantity": "quantity/amount"},
                            ...
                        ]
                    }
                    While Sending the Response, Act as an API and strictly follow the structure provided above and only return a single array without any additional information, sentence, etc like an API does`,
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

module.exports={
    RecipeRoute
}