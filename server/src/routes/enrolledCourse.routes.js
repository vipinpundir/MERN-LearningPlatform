const express = require("express")
const router = express.Router()

const enrolledCourseController = require("../controllers/enrolledCourse.controller")


router.post("/", enrolledCourseController.enrollUserInCourse);
router.get("/:userEmail", enrolledCourseController.findEnrolledCoursesForUser);



module.exports = router;