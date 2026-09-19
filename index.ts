
import express from "express";
import cors from "cors";
import { AuthRouter } from "./src/router/AuthRouter.route.js";
import { UserRouter } from "./src/router/User.route.js";
import { CategoriesRouter } from "./src/router/categorie.route.js";
import { taskRouter } from "./src/router/task.route.js";
import { NotedRouter } from "./src/router/noted.router.route.js";
require('dotenv').config()
const app = express()
const port = 3001
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.send('API VIRAOLIV Update')
})

app.use("/api", AuthRouter)
app.use("/api", UserRouter)
app.use("/api", CategoriesRouter)
app.use("/api", taskRouter)
app.use("/api", NotedRouter)

app.listen(port, () => {
    return console.log(`BACK END BERJALAN FOR PORT : ${port}`)
})