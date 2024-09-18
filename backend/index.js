import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import path from "path"
import userRoute from "./routes/user-route.js"
import genreRoute from "./routes/genre-route.js"
import movieRoute from "./routes/movie-route.js"
import uploadRouter from "./routes/upload-route.js"

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
app.use("/api/genres", genreRoute)
app.use("/api/movies", movieRoute)
app.use("/api/uploads", uploadRouter)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))

//exported for testing only
export {
    app
}