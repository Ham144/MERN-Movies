import { json } from "body-parser"

const asyncHandler = async (fn) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        res.status(500), json({
            errors: error.message || error
        })
    })
}
export default asyncHandler