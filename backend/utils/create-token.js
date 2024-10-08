
import jwt from "jsonwebtoken"

const generateToken = (res, username) => {

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development", //hanya bisa diakses dari https atau tidak
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })


}

export default generateToken 