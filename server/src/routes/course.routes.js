const express = require("express")
const router = express.Router()

const courseController = require("../controllers/course.controller");
const protectRoute = require("../middleware/protectRoute");


router.get("/", courseController.getAllCourses);
router.get("/id/:id", protectRoute, courseController.getCourseById);
router.post("/add", protectRoute, courseController.createCourse);
router.patch("/update/:id", protectRoute, courseController.updateCourseById);
router.delete("/delete/:id", protectRoute, courseController.deleteCourseById);


module.exports = router;