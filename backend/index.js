import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import path from "path"
import userRoute from "./routes/user-route.js"

const app = express()
const PORT = process.env.PORT || 4004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log("success running on " + PORT)
})


//routes
app.use("/api/users", userRoute)

//exported for testing only
export {
    app
}