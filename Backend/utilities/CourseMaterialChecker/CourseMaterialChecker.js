const CourseMaterial = require("../../models/CourseMaterial")

exports.checkCourseMaterial = async(req,res,next) => {
    try {
        const {courseId} = req.params;
        const material = await CourseMaterial.find({courseId:courseId});
        if(material.length===3){
            return res.status(404).json({
                status:"fail",
                message:"Can Upload 3 files at max!"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status:"fail"
        })
    }
}