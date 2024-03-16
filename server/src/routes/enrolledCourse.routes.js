const express = require("express")
const router = express.Router()

const enrolledCourseController = require("../controllers/enrolledCourse.controller");
const protectRoute = require("../middleware/protectRoute");


router.post("/", protectRoute, enrolledCourseController.enrollUserInCourse);
router.get("/:userEmail", protectRoute, enrolledCourseController.findEnrolledCoursesForUser);



module.exports = router;