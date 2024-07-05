import { Router } from "express";
import { createCours, getCours, getCoursById, updateCours, deleteCours, getCoursesByClasse, DownloadFile } from "../controllers/cours.controllers.js";
import multer, { diskStorage } from "multer"
import path from "path"



const router = Router();

const upload = multer({
    storage: diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/images");
        },
        filename: (req, file, cb) => {
            const name = file.originalname.split(" ").join("_");
            const extension = path.extname(file.originalname);
            cb(null, name + Date.now() + extension);
        }
    }),
    limits: {
        fileSize: 512 * 1024 // Set file size limit in bytes
    }
}).single("files");

router.post("/create", upload, createCours)

router.get("/get", getCours)

router.get("/:id", getCoursById)

router.get("/courses/classe/:id", getCoursesByClasse)

router.patch("/:id", upload, updateCours)

router.delete("/:id", deleteCours)
router.get('/download/:fileName',DownloadFile)
export default router;