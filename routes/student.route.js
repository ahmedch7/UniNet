import { Router } from "express";
import { createStudent } from "../controllers/student.controllers.js";

const router = Router();

router.post("/create", createStudent)

export default router;