

import express from "express";
import multer from "multer";
import fs from "fs"
import path from "path"

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },

    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|PNG|webp/;
    const mimetypes = /image\/jpe?g|image\/PNG||image\/webp/;

    const extname = path.extname(file.originalname)
    const mimetype = file.mimetype

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true)
    }
    else {
        cb(new Error("image only", false))
    }
}

const upload = multer({
    storage, fileFilter
})
const uploadSingleImage = upload.single('image')//ini harus sama dengan thunder client field name

router.post("/", (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            return res.status(403).json({ error: err.message })
        }
        else if (req.file) {
            return res.send({ data: `${req.file.path}` })
        }
        else {
            return res.status(400).json({ error: "no image provided" })
        }
    })
})

router.delete("/delete", (req, res) => {
    const path = req.body.path
    fs.unlink(path, (err) => {
        if (err) {
            // Handle specific error if any
            if (err.code === 'ENOENT') {
                console.error('File does not exist.');
            } else {
                throw err;
            }
        } else {
            console.log('File IMAGE deleted!');
            res.json({ data: "image deleted" })
        }
    })
})

export default router   