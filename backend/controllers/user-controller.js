import asyncHandler from "../middlewares/async-handler.js"
import { prisma } from "../utils/database/prisma.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/create-token.js"

const createUser = asyncHandler(async (req, res) => {
    const body = await req.body
    const { username, name, password, isAdmin, phone, email } = body

    if (!username || !name || !password || !email) {
        throw new Error("Please add all obligation fields")
    }
    const userExist = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    const emailExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (userExist || emailExist) return res.status(403).json({ errors: "username or email exist" })

    //hasing
    body.password = bcrypt.hashSync(password, 10)
    //add to database
    try {
        let user = await prisma.user.create({
            data: body,
            select: {
                username: true,
                name: true,
                email: true,
                isAdmin: false,
                phone: true
            }
        })
        generateToken(res, user.username)
        return res.status(200).json({
            data: user
        })

    } catch (error) {
        return res.status(400).send({ errors: error.message })
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const body = req.body
    const { email, password } = body


    if (!email || !password) {
        return res.status(400).json({ errors: "email and password required" })
    }

    const userDB = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            username: true,
            name: true,
            email: true,
            password: true,
            isAdmin: true,
            phone: true
        }
    })

    if (!userDB) {
        return res.status(404).json({ errors: "no user with this email" })
    }

    else {
        try {
            const passwordCorrect = bcrypt.compareSync(password, userDB.password)

            if (!passwordCorrect) {
                return res.status(401).json({ errors: "email or password is wrong" })
            }
            generateToken(res, userDB.username)

            const user = {
                username: userDB.username,
                name: userDB.name,
                email: userDB.email,
                isAdmin: userDB.isAdmin,
                phone: userDB.phone
            }

            return res.status(200).json({
                data: user
            })
        } catch (error) {
            return res.status(401).json({ errors: error })
        }
    }


})

const logoutUser = asyncHandler(async (req, res) => {

    try {
        // console.log(req.signedCookie['jwt'])
        //perlu tambahan untuk hapus cookie res.clearCookie("jwt")
        const token = req.signedCookies['jwt'];
        if (token) { console.log("token ini berikut berhasil dihapus : " + token) }
        else { return res.status(401).json({ success: false, message: "gagal logout" }) }
        return res.clearCookie("jwt").status(200).end()
    } catch (error) {
        return res.status(401).json({
            errors: error.message
        })
    }

})

const getAllUser = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({})
    if (users.length == 0) {
        return res.status(404).json({ errors: "no user found" })
    }

    return res.status(202).json({ data: users })
})

const getSingleUser = asyncHandler(async (req, res) => {
    const username = req.params.username

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                username: true,
                name: true,
                email: true,
                isAdmin: true,
                phone: true
            }
        })
        return res.status(200).json({ data: user })
    } catch (error) {
        return res.status(403).json({ errors: error.message })
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {

    try {
        if (req.user == undefined) throw new Error("problem found, no current user")
        return res.status(200).json({ data: req.user })
    } catch (error) {
        return res.status(401).json({ errors: error.message })
    }
})

const updateSingleUser = asyncHandler(async (req, res) => {

    const username = req.params.username
    const { name, password, isAdmin, phone, email } = req.body

    if (!username) return res.status(402).json({
        errors: "username params required"
    })
    else if (!req.user.username) {
        return res.status(401).json({ errors: "not authenticated" })
    }
    else if (req.user.username != username) {
        if (req.user.isAdmin == "REGULER") {
            return res.status(403).json({
                errors: "you can't update other user, except you are an admin"
            })
        }
        else {
            try {

                const userDB = await prisma.user.findUnique({
                    where: {
                        username: username
                    },
                    select: {
                        username: true,
                        name: true,
                        email: true,
                        password: true,
                        isAdmin: true,
                        phone: true
                    }
                })

                if (!userDB) return res.status(404).json({ errors: "user not found" })

                const newUserDB = await prisma.user.update({
                    where: {
                        username: username
                    },
                    data: {
                        username: username,
                        email: email || userDB.email,
                        name: name || userDB.password,
                        isAdmin: isAdmin || userDB.isAdmin,
                        password: password || userDB.password,
                        phone: phone || userDB.phone
                    },
                    select: {
                        username: true,
                        name: true,
                        email: true,
                        isAdmin: true,
                        phone: true
                    }
                })
                const warnUserName = username != req.body.username ? ("you cant change username becasue it is as a Foreign key") : null;

                return (200).json({ warnUserName, data: newUserDB, message: "successfully change others profile" })
            } catch (error) {
                return res.status(400).json({ errors: error.message })
            }
        }

    }

    else {
        const userDB = await prisma.user.update({
            where: {
                username: username
            },
            data: {
                username: req.user.username,
                email: email || req.user.email,
                name: name || req.user.name,
                isAdmin: isAdmin || req.user.isAdmin,
                password: password || req.user.password,
                phone: phone || req.user.phone
            },
            select: {
                username: true,
                name: true,
                email: true,
                isAdmin: true,
                phone: true
            }
        })
        req.user = userDB
        return res.status(200).json({ data: req.user, message: "your own profile is up to date" })
    }

})

const deleteSingleUser = asyncHandler(async (req, res) => {
    const username = req.params.username;

    if (!username) return res.status(403).json({ errors: "username params required" })

    if (username == req.user.userna) {
        return res.status(403).json({ errors: "you cant delete your own account" })
    }

    try {
        const user = await prisma.user.delete({
            where: {
                username: username,
            },
        })

        if (!user) return res.status(404).json({ errors: "user not found" })

        return res.status(204).json({ ok: true })
    } catch (error) {
        return res.status(401).json({ errors: error.message })
    }

})

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUser,
    getSingleUser,
    getCurrentUser,
    updateSingleUser,
    deleteSingleUser
}
