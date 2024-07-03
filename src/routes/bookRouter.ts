import express from "express";
import { createBook } from "../controllers/book";
import multer from "multer";
import path from "node:path";

const bookRouter = express.Router();
const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    // 30mb
    limits: { fileSize: 3e7 },
});
bookRouter.post(
    "/",
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    createBook,
);

export default bookRouter;
