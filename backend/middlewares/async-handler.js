
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        res.status(403).json({
            errors: error.message || error
        })
    })
}
export default asyncHandler 