import jwt from "jsonwebtoken";
import asyncHandler from "./async-handler.js";


//check if authenticated user 
const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    //read jwt from cookies
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET)

        } catch (error) {
            res.status(401)
            throw new Error("you are not authenticated yet, please login")
        }
    }
})