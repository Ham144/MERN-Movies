import express from "express"
import { getAllMovies, createMovie, deleteMovie, editMovie, getSingleMovie, createReview } from "../controllers/movie-controller.js"
import { authenticate, authorizeIsAdmin } from "../middlewares/auth-midleware.js"

const router = express.Router()

//public
router.get("/", getAllMovies)
router.get("/:id", getSingleMovie)

//authenticated
router.post("/:movieId/review", createReview) //review

//authorized admin
router.post("/", authenticate, authorizeIsAdmin, createMovie)
router.delete("/delete/:id", authenticate, authorizeIsAdmin, deleteMovie)
router.put("/edit/:id", authenticate, authorizeIsAdmin, editMovie)

export default router