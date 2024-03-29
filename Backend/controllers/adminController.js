const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Student = require("../models/Student");
const Instructor = require("../models/Instructor");
const Feedback = require("../models/Feedback");
const mongoose = require("mongoose");
const CourseFeedback = require("../models/CourseFeedback");
const sendAccountDeleteEmail = require("../utilities/emailConfig/sendAccontdelete")

const filterObject = (obj,...allowedFields) => {
    let newObject = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObject[el] = obj[el] //add desired fields to new obj
        }
    })
    return newObject;
}

exports.getAdminDetails = async(req,res) => {
    try {
        const {admin} = req;
        const resAdmin  = await Admin.findById(admin._id);
        return res.status(200).json({
            status:"success",
            data:{
                user:resAdmin
            }
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.createAdmin = async(req,res,next) =>{
    try {
        const newAdmin = await Admin.create(req.body);
        return res.status(201).json({
            status:"success",
            data:{
                newAdmin
            }
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.deleteStudent = async(req,res,next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {studentId} = req.params;
        const resStudent = await Student.findById(studentId);
        console.log(resStudent);
        const removeEnrolled = await Course.updateMany({enrolledStudents:{$elemMatch:{$eq:studentId}}},{$pull:{enrolledStudents:studentId}},{new:true}).session(session);
        const deletedFeedbacks = await Feedback.deleteMany({FeedbackTo:studentId});
        const deletedCourseFeedbacks =  await CourseFeedback.deleteMany({studentId:studentId});
        //const response = sendAccountDeleteEmail(resStudent);
        //console.log(response);
        await Student.findByIdAndDelete(studentId);
        session.commitTransaction();
        return res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        session.abortTransaction();
        console.log(error)
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.deleteAdmin = async(req,res) => {
    try {
        const {id} = req.params;
        await Admin.findByIdAndDelete(id);
        return res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getAllAdmins = async(req,res) => {
    try {
        const allAdmins = await Admin.find();
        return res.status(200).json({
            status:"success",
            data:{
                length:allAdmins.length,
                admins:allAdmins
            }
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getAllStudents = async(req,res,next) => {
    try {
        const resStudents = await Student.find();
        return res.status(200).json({
            status:"success",
            data:{
                length:resStudents.length,
                students:resStudents
            }
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getStudentWithId = async(req,res,next) => {
    try {
        const {admin} = req;
        const {studentId} = req.params;
        const resStudent = await Student.findById(studentId);
        return res.status(200).json({
            status:"success",
            data:{
                user:resStudent
            }
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:"error"
        })
    }
}

exports.getAllCourses = async(req,res,next) => {
    try {
        const resCourses = await Course.find();
        return res.status(200).json({
            status:"success",
            data:{
                resCourses:resCourses
            }
        })
    } catch (error) {
        
    }
}

exports.updateStudent = async(req,res,next) => {
    const {studentId} = req.params;
    if(req.body.currentPassword || req.body.passwordConfirm){
        return res.status(400).json({ //400 -> bad request
            status:"fail",
            message:"Please use /updateDetails/password for password updates!"
        })
    }
    try {
        //can't use user.save() as some fields are required which throws err
        //using findByIdAndUpdate() here
        const filteredBody = filterObject(req.body,'studentAddress','studentContact',"studentName");
        const updatedStudent = await Student.findByIdAndUpdate(studentId,filteredBody,{new:true,runValidators:true});
        return res.status(200).json({
            status:"success",
            data:{
                updatedStudent
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error
        })
    }
}

exports.updateAdminDetails = async(req,res,next) => {
    //const {email,adminName,adminContact,adminAddress} = req.body;
    const {admin} = req;
    if(req.body.currentPassword || req.body.passwordConfirm){
        return res.status(400).json({ //400 -> bad request
            status:"fail",
            message:"Please use /updateDetails/password for password updates!"
        })
    }
    try {
        //can't use user.save() as some fields are required which throws err
        //using findByIdAndUpdate() here
        const filteredBody = filterObject(req.body,"email","adminName","adminContact","adminAddress");
        const updatedAdmin = await Admin.findByIdAndUpdate(req.admin._id,filteredBody,{new:true,runValidators:true});
        return res.status(200).json({
            status:"success",
            data:{
                updatedAdmin
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error
        })
    }
}

exports.updatePassword = async(req,res,next) => {
    try {
        const {currentPassword,newPassword,newPasswordConfirm} = req.body;
        const admin = await Admin.findById(req.admin._id).select('+adminPassword');
        if(!await Admin.correctPassword(currentPassword,admin.adminPassword)){
            return res.status(401).json({
                status:"fail",
                message:"Current Password is incorrect!"
            })
        }
        admin.adminPassword = newPassword;
        admin.passwordConfirm = newPasswordConfirm;
        await admin.save(); //runs validation again
        const token = signToken(admin._id);
        return res.status(200).json({
            status:"success",
            token:token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"fail",
            message:error
        })
    }
}
exports.deleteCourse = async(req,res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {courseId} = req.params;
        const removeEnrolled = await Student.updateMany({enrolledInCourses:{$elemMatch:{$eq:courseId}}},{$pull:{enrolledInCourses:courseId}},{new:true}).session(session);
        const deletedFeedbacks = await Feedback.deleteMany({courseId:courseId});
        const deletedCourseFeedbacks =  await CourseFeedback.deleteMany({courseId:courseId});
        const deletedAssignedCourse = await Instructor.updateMany({coursesAssigned:{$elemMatch:{$eq:courseId}}},{$pull:{coursesAssigned:courseId}},{new:true}).session(session);
        await Course.findByIdAndDelete(courseId);
        session.commitTransaction();
        return res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        console.log(error);
        session.abortTransaction()
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}
exports.getAllInstructors = async(req,res,next) => {
    try {
        const resInstructors = await Instructor.find();
        //console.log(resInstructors)
        const newInstructors = []
        resInstructors.forEach(instructor => {
            if(instructor.email !== "invalid"){
                newInstructors.push(instructor)
            }
        })
        console.log(newInstructors)
        return res.status(200).json({
            status:"success",
            data:{
                length:resInstructors.length,
                instructors:newInstructors
            }
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}
exports.updateInstructor = async(req,res,next) => {
    const {instructorId} = req.params;
    if(req.body.currentPassword || req.body.passwordConfirm){
        return res.status(400).json({ //400 -> bad request
            status:"fail",
            message:"Please use /updateDetails/password for password updates!"
        })
    }
    try {
        //can't use user.save() as some fields are required which throws err
        //using findByIdAndUpdate() here
        const filteredBody = filterObject(req.body,'instructorAddress','instructorContact',"instructorName");
        const updatedInstructor = await Instructor.findByIdAndUpdate(instructorId,filteredBody,{new:true,runValidators:true});
        return res.status(200).json({
            status:"success",
            data:{
                updatedInstructor
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error
        })
    }
}
exports.deleteInstructor = async(req,res,next) => {
    const {instructorId} = req.params;
    if(req.body.currentPassword || req.body.passwordConfirm){
        return res.status(400).json({ //400 -> bad request
            status:"fail",
            message:"Please use /updateDetails/password for password updates!"
        })
    }
    try {
        //can't use user.save() as some fields are required which throws err
        //using findByIdAndUpdate() here
        const filteredBody = filterObject(req.body,'email');
        const updatedInstructor = await Instructor.findByIdAndUpdate(instructorId,filteredBody,{new:true});
        return res.status(200).json({
            status:"success",
            data:{
                updatedInstructor
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error
        })
    }
}
