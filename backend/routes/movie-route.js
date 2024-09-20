import express from "express"
import { getAllMovies, createMovie, deleteMovie, editMovie, getSingleMovie, createReview, deleteReview, hypeMovies, latestMovies, getRandomMovies, getAllReviews } from "../controllers/movie-controller.js"
import { authenticate, authorizeIsAdmin } from "../middlewares/auth-midleware.js"

const router = express.Router()

//public
router.get("/", getAllMovies)
router.get("/:id", getSingleMovie)
router.get("/get/random", getRandomMovies)
router.get("/get/hypemovies", hypeMovies)
router.get("/get/latest", latestMovies)

//authenticated
router.post("/:movieId/reviews", authenticate, createReview) //review

//authorized admin
router.post("/", authenticate, authorizeIsAdmin, createMovie)
router.delete("/delete/:id", authenticate, authorizeIsAdmin, deleteMovie)
router.put("/edit/:id", authenticate, authorizeIsAdmin, editMovie)
router.delete("/:movieId/reviews/:id", authenticate, authorizeIsAdmin, deleteReview)
router.get("/get/reviews", authenticate, authorizeIsAdmin, getAllReviews)


export default router