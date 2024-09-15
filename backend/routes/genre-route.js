import express from "express"
import { createGenre, deleteGenre, getAllGenre, updateGenre } from "../controllers/genre-controller.js"
import { authenticate, authorizeIsAdmin } from "../middlewares/auth-midleware.js"

const router = express.Router()

router.post("/", authenticate, authorizeIsAdmin, createGenre)
router.delete("/:id", authenticate, authorizeIsAdmin, deleteGenre)
router.put("/:id", authenticate, authorizeIsAdmin, updateGenre)
router.get("/", authenticate, getAllGenre)

export default router