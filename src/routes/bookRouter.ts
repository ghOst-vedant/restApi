import express from "express"
import {
    createBook,
    deleteBook,
    getBookById,
    getBooks,
    patchBook,
} from "../controllers/book"
import multer from "multer"
import path from "node:path"
import auth from "../middleware/auth"

const bookRouter = express.Router()
const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    // 30mb
    limits: { fileSize: 1e7 },
})

//Book CRUD routes
bookRouter.post(
    "/",
    auth,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    createBook,
)
bookRouter.patch(
    `/:bookId`,
    auth,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    patchBook,
)
bookRouter.get("/", getBooks)
bookRouter.get("/:bookId", getBookById)
bookRouter.delete("/:bookId", auth, deleteBook)
export default bookRouter
