import asyncHandler from "../middlewares/async-handler.js";
import { prisma } from "../utils/database/prisma.js";


const createGenre = asyncHandler(async (req, res) => {
    const body = req.body
    try {
        const existingGenre = await prisma.genre.findUnique({
            where: {
                name: body.name
            }
        })
        if (existingGenre) return res.status(403).json({ errors: "genre already exist" })
        const result = await prisma.genre.create({ data: { name: body.name } })
        return res.status(200).json({ data: ` ${result.name} is added as new genre` })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ errors: error?.message })
    }

})

const updateGenre = asyncHandler(async (req, res) => {
    const body = req.body
    const id = req.params.id

    if (!id && body?.name) return res.status(403).json({ errors: "id params required & body name required" })

    try {

        if (body.name) {
            const existingGenre = await prisma.genre.findUnique({
                where: {
                    name: body?.name
                },
            })
            if (existingGenre) return res.status(403).json({ errors: "genre rename failed, due to duplication" })
        }

        const result = await prisma.genre.update({
            where: {
                id: Number(id)
            },
            data: {
                id: Number(id),
                name: body?.name
            }
        })
        return res.status(200).json({ data: `genre ${result.name} updated successfully` })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ errors: error.message })
    }

})

const deleteGenre = asyncHandler(async (req, res) => {
    const body = req.body
    const id = req.params.id

    if (!id) return res.status(403).json({ errors: "id params required" })

    try {
        const result = await prisma.genre.delete({
            where: {
                id: Number(id)
            },
            select: {
                name: true,
                id: true
            }
        })

        return res.status(200).json({ data: `genre ${result.name} deleted successfully` })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ errors: error?.message || error })
    }

})


const getAllGenre = asyncHandler(async (req, res) => {
    try {
        const result = await prisma.genre.findMany()
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(400).json({
            errors: error.message
        })
    }
})


export {
    createGenre,
    updateGenre,
    deleteGenre,
    getAllGenre
}