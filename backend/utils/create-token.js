
import jwt from "jsonwebtoken"

const generateToken = (res, username) => {

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production", //hanya bisa diakses dari https atau tidak
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30hari
        signed: true
    })

}

export default generateToken 