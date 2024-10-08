import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import path from "path"
import userRoute from "./routes/user-route.js"
import genreRoute from "./routes/genre-route.js"
import movieRoute from "./routes/movie-route.js"
import uploadRouter from "./routes/upload-route.js"
import cors from "cors"


const app = express()
const PORT = process.env.PORT || 3001;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));//new
// app.use(bodyParser.json({ limit: '50mb', extended: true }));//new

// app.get("/", (req, res) => {
//     res.send("Hello World!")
// })

app.listen(PORT, () => {
    console.log("success running on " + PORT)
})


app.use(cors())

//routes
app.use("/api/users", userRoute)
app.use("/api/genres", genreRoute)
app.use("/api/movies", movieRoute)
app.use("/api/uploads", uploadRouter)


const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))

//menampilkan frontend yang sudah di build, kalau edit fe harus rebuild
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend/dist/index.html"))
})

//exported for testing only
export {
    app
}