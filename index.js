// ...............Importing NPM Packages....................
const express=require("express")
const cors=require("cors")
require('dotenv').config()

// .......................Importing Modules.

const {RecipeRoute}=require("./router/reciperouter")


// .................Express App................

const app=express()
app.use(cors())
app.use(express.json())

// .............App Routes.......................

app.get("/",(req,res)=>{
    res.status(200).send("Home Page")
})

app.use("/recipe",RecipeRoute)



// ...............App Listen................

app.listen(process.env.PORT,async()=>{
    try {
        console.log("Successfully Connected To DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is Running at Port:${process.env.PORT}`)
})