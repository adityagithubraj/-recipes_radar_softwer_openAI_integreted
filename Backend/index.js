// ...............Importing NPM Packages....................
const express = require("express")
const cors = require("cors")
require('dotenv').config()

// .......................Importing Modules.

const { RecipeRoute } = require("./Routes/RecipeRouter")
const { authRouter } = require("./Routes/auth")
const {SaveRecipeRoute}=require("./Routes/save-recipe")
const { authenticateUser } = require("./Middlewares/authMiddleware")
const { sequelize } = require("./models")

// .................Express App................

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


// .............App Routes.......................

app.get("/", (req, res) => {
    res.status(200).send("Home Page of Recipe Radar Sever")
})

app.use("/auth", authRouter)

app.use("/recipe", authenticateUser, RecipeRoute)
// app.use("/recipe", RecipeRoute)

app.use("/saved-recipes",SaveRecipeRoute)



// ...............App Listen And Initializing DB Connectiom................

sequelize.sync()
    .then(() => {
        console.log("Database Synced");
        app.listen(process.env.PORT, () => {
            console.log(`Server is Running at Port:${process.env.PORT}`)
        });
    })
    .catch((error) => {
        console.error("Database Connection Error:", error)
    })

// 