import { Router } from "express";
import { createClasse, getClasse, getClasseById, updateClasse, deleteClasse, getClassesByNiveau, getStudentsByClasse, assignStudentsToClass, getUnassignedStudents, getUsersByRoleAndUniversity  } from "../controllers/classe.controllers.js";

const router = Router();

router.post("/create", createClasse)

router.post('/classes/:id/assign-students', assignStudentsToClass)

router.get('/user/:role/:universityId/:niveauxEducatif', getUsersByRoleAndUniversity)


router.get("/get", getClasse )

router.get("/:id", getClasseById)

router.get("/classes/:id", getClassesByNiveau)

router.get("/students/:id", getStudentsByClasse)

router.get('/student/unassigned/:role/:universityId/:niveauxEducatif', getUnassignedStudents);

router.patch("/:id", updateClasse)

router.delete("/:id", deleteClasse)

export default router;
