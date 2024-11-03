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


app.use(express.json()) //parsing segalanya auto jadi json
app.use(express.urlencoded({ extended: true })) //aga bisa membaca action form(ga penting kali ini)
app.use(cookieParser(process.env.JWT_SIGNATURE)) //buat jwt jadi signedCookies(cookie yg perlu signature)
app.use(cors({ origin: "http://localhost:5173", credentials: true })) //credentials true buat fe jadi auto kirim cookie untuk diperiksa, origin untuk mengizinkan fe, * untuk bebas origin


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

//menampilkan frontend yang sudah di build, kalau edit fe harus rebuild
app.use(express.static(path.join(__dirname, "/frontend/dist")))//untuk home
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../MERN Movies/frontend/dist", "index.html"))//untuk lain
})