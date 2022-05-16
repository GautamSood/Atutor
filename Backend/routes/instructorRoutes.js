const express = require("express");
const router = express.Router();
const Instructor = require("../models/Instructor");
const {getAllInstructors, getInstructorCourses, getInstructorDetails, createCourse, checkInstructorExists, giveFeedback, deleteFeedback,getStudentFeedbackDetails, updatePassword, updateDetails, updatedCourseDescription, updateCourseMaterial, deleteCourseMaterial} = require("../controllers/instructorController")
const {checkId} = require("../utilities/Email/checkEmail")
const {checkFeedbackGiven} = require("../utilities/feedbacks/checkFeedbackGiven")
const {login,restrictTo,protect,signup} = require("../controllers/Auth/instructorAuth")
const {checkCourseMaterial} = require("../utilities/CourseMaterialChecker/CourseMaterialChecker")
const upload = require('../utilities/CourseMaterial/Multer');


router.post("/signup",checkId, signup);
router.post("/login",login);
router.post("/createCourse",protect,restrictTo("instructor"),createCourse);
/* get feedbacks by instructorId specific */
router.post("/giveFeedback/:courseId",protect,restrictTo("instructor"),checkFeedbackGiven,giveFeedback);
router.post("/courseMaterial/:courseId",protect,restrictTo("instructor"), checkCourseMaterial,upload.single("pdfName"), updateCourseMaterial);


router.get("/allUsers",getAllInstructors);
router.get("/getInstructor",protect,getInstructorDetails);
router.get("/getStudentFeedbacks/:courseId/:studentId",protect,restrictTo("instructor"),getStudentFeedbackDetails);
router.get("/coursesAssigned",protect,restrictTo("instructor"),getInstructorCourses);


//router.delete("/:courseId/feedback",protect,restrictTo("instructor"),deleteFeedback);

router.put("/updateDescription/:courseId",protect,restrictTo("instructor"),updatedCourseDescription);
router.patch("/updateDetails/password",protect,restrictTo("instructor",updatePassword))
router.patch("/updateDetails",protect,restrictTo("instructor"),updateDetails);

router.delete("/courseMaterial/:courseMaterialId/:courseId",protect,restrictTo("instructor"),deleteCourseMaterial);
module.exports = router;