
import express from "express";
import { createUser, deleteSingleUser, getAllUser, getCurrentUser, getSingleUser, loginUser, logoutUser, updateSingleUser } from "../controllers/user-controller.js";
import { authenticate, authorizeIsAdmin } from "../middlewares/auth-midleware.js";

const router = express.Router();


router.post("/", createUser).get(authenticate, authorizeIsAdmin, getAllUser)
router.post("/auth", loginUser)
router.delete("/logout", authenticate, logoutUser)
router.get("/", authenticate, authorizeIsAdmin, getAllUser) //belum digunakan
router.get("/:username", authenticate, getSingleUser) //belum digunakan
router.get("/current/user", authenticate, getCurrentUser)
router.patch("/update/:username", authenticate, updateSingleUser)
router.delete("/delete/:username", authenticate, deleteSingleUser) //belum digunakan


export default router
