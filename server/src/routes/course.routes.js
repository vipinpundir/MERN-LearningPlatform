const express = require("express")
const router = express.Router()

const courseController = require("../controllers/course.controller")


router.get("/", courseController.getAllCourses);
router.get("/id/:id", courseController.getCourseById);
router.post("/add", courseController.createCourse);
router.patch("/update/:id", courseController.updateCourseById);
router.delete("/delete/:id", courseController.deleteCourseById);


module.exports = router;