import { prisma } from "../utils/database/prisma.js"


export const createMovie = async (req, res) => {
    const body = req.body
    const { title, description, image, genres, casts, year } = body


    if (!title || !description || !image || !genres || !casts || !year) {
        return res.status(403).json({ errors: "some field are null" })
    }

    else if (typeof genres != "object" || typeof casts != "object") {
        return res.status(405).json({ errors: "casts and genres should be in correct form" })
    }

    try {

        const genresArray = (await prisma.genre.findMany({
            where: {
                id: {
                    in: [...genres]
                }
            }
        }))

        const result = await prisma.movie.create({
            data: {
                title,
                description,
                genres: {
                    connect: genresArray
                },
                image,
                casts,
                year
            }
        })

        res.json({ data: result })

    } catch (error) {
        return res.status(400).json({ errors: error.message })
    }
}

export const deleteMovie = async (req, res) => {
    const { id } = req.params

    const existingmovie = await prisma.movie.findUnique({
        where: {
            id: +id
        }
    })
    if (!existingmovie) {
        return res.status(404).json({
            errors: "we can't find such movie with the id"
        })
    }

    try {
        const result = await prisma.movie.delete({
            where: {
                id: +id
            }
        })
        return res.json({ data: result })
    } catch (error) {
        return res.status(400).json({ errors: error.message })
    }

}

export const editMovie = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const { title, description, image, genres, casts, year } = body

    if (!id) return res.status(403).json({ errors: "id param required" })
    else if (+year > 2025) return res.status(403).json({ errors: "the year" })

    const genresArray = await prisma.genre.findMany({
        where: {
            id: {
                in: [...genres]
            }
        }
    })

    try {

        const result = await prisma.movie.update({
            where: {
                id: +id
            },
            data: {
                title,
                description,
                image,
                genres: {
                    connect: genresArray
                },
                casts,
                year
            }
        })

        if (!result) return res.status(403).json("failed to editMovie")
        return res.json({ data: result })

    } catch (error) {
        return res.status(400).json({ errors: error.message })
    }
}

export const getAllMovies = async (req, res) => {
    try {
        const result = await prisma.movie.findMany()
        res.json({ data: result })
    } catch (error) {
        return res.status(400).json({ errors: error.message })
    }
}

export const getSingleMovie = async (req, res) => {
    const { id } = req.params

    try {
        const result = await prisma.movie.findUnique({
            where: {
                id: +id
            }
        })

        return res.json({
            data: result
        })
    } catch (error) {
        return res.status(400).json({ errors: error.message })
    }
}


export const createReview = async (req, res) => {
    const body = req.body
    const { movieId } = req.params
    const { rating, comment, currentUserName } = body

    if (!movieId) {
        return res.status(400).json({ errors: "movieId is null" })
    }


    if (!rating || !comment || comment.length <= 3 || !currentUserName) {
        return res.status(403).json({ errors: "currentUserName, rating, comment is required, comment should length > 3" })
    }

    const existingmovie = await prisma.movie.findUnique({
        where: {
            id: +movieId
        }
    })
    if (!existingmovie) return res.status(404).json({ errors: "not found movie" })


    if (+rating > 5) {
        return res.status(403).json({ errors: "rating should less then 5" })
    }


    const user = await prisma.user.findUnique({
        where: {
            username: currentUserName
        }
    })

    const movie = await prisma.movie.findUnique({
        where: {
            id: +movieId
        }
    })

    if (!user || !movie) return res.status(404).json({ errors: "something wrong, not found" })

    try {

        const result = await prisma.reviews.create({
            data: {
                comment,
                rating: +rating,
                user: {
                    connect: user
                },
                movies: {
                    connect: movie
                },
            }
        })
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(400).json({ errors: error.message })
    }
}