import jwt from "jsonwebtoken";
import asyncHandler from "./async-handler.js";
import { prisma } from "../utils/database/prisma.js";


//check if authenticated user 
const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    //read jwt from cookies
    token = req.signedCookies['jwt'] //cookie yg terdapat signed: true saat res.cookie({signed: true})
    // token = req.cookies['jwt'] //cookie normal

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await prisma.user.findUnique({
                where: {
                    username: decode.username
                },
                select: {
                    username: true,
                    name: true,
                    email: true,
                    isAdmin: true,
                    phone: true
                }
            })
            next()
        } catch (error) {
            res.status(401).json({ errors: error.message })
        }
    }
    else {
        res.status(401)
        throw new Error("you are not authenticated yet, please login")
    }
})

const authorizeIsAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin == "ADMIN") {
        next()
    }
    else {
        res.status(403).json({ errors: `${req.user.name} is Not authorized as an admin` })
    }
}

export {
    authenticate, authorizeIsAdmin
}