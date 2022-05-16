import React, { useEffect, useState } from 'react'
import InstructorNavbar from '../instructorNavbar/InstructorNavbar';
import { useNavigate, useParams } from 'react-router-dom'
import { Loader, Panel, PanelGroup, Modal } from 'rsuite';
import Cookies from "js-cookie";
import { useGetCourseDetails } from '../../../hooks/StudentHooks/useGetCourseDetails';
import StudentFeedbackForm from './StudentFeedbackForm';
import { useUpdateCourseDescription } from '../../../hooks/InstructorHooks/useUpdateCourseDescription';
import { useUpdateCourseMaterial } from '../../../hooks/InstructorHooks/useUpdateCourseMaterial';
import { useDeleteCourseMaterial } from '../../../hooks/InstructorHooks/useDeleteCourseMaterial';

const ManageCourseInfo = () => {
    const [courseDetails,setCourseDetails] = useState();
    const [courseDescription,setCourseDescription] = useState("");
    //const [feedbackDetails,setFeedbackDetails] = useState();
    //const [studentFeedback,setStudentFeedback] = useState("");
    const [courseMaterial,setCourseMaterial] = useState();
    const [fileDetails,setFileDetails] = useState();
    const [courseMaterialList,setCourseMaterialList] = useState([]);
    const {courseId} = useParams();
    const navigate = useNavigate();
    const [showModal,setShowModal] = useState(false);

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        //console.log(userDetailsCookie);
        //setUser(userDetailsCookie);
        if(!userDetailsCookie){
            navigate("/Admin");
        }
    }, [navigate])

    const getCourseDetailsSuccess = (data) => {
        //console.log(data?.data?.data?.course?.courseMaterial);
        setCourseMaterialList(data?.data?.data?.course?.courseMaterial);
        setCourseDetails(data?.data?.data?.course);
        //setInstructorLetter(data?.data?.data?.course?.instructorId?.instructorName?.charAt(0).toUpperCase());
    }
    const getCourseDetailsError = (error) => {
        console.log(error?.response);
    }

    const handleCourseMaterialUpload = e => {
        e.preventDefault();
        console.log(courseMaterial);
        const courseObj = {
            courseId:courseId,
            courseMaterial:{
                pdfName:courseMaterial
            }
        }
        updateCourseMaterial(courseObj);
        setCourseMaterial();
    }
    const handleCourseMaterialDelete = async(materialId) => {
        const courseIdObj = {
            materialId:materialId,
            courseId:courseId
        }
        deleteCourseMaterial(courseIdObj);
    }
    /* const handleStudentFeedbackSubmit = (e,studentId) => {
        console.log(studentId);
        e.preventDefault();
        const feedbackObj = {
            courseId:courseId,
            feedback:{
                studentId:studentId,
                feedbackMessage:studentFeedback
            }
        }
        giveFeedback(feedbackObj)

    }
    const handleGiveFeedbackError = error => {
        console.log(error?.response)
    }

    const handleGetStudentFeedbackSuccess = data => {
        //console.log(data?.data?.data?.feedback);
        setFeedbackDetails(data?.data?.data?.feedback);
        //console.log(feedbackDetails)
    }

    const handleGetStudentFeedbackError = error => {
        console.log(error?.response);
    }

    const handleFeedbackDelete = e => {
        e.preventDefault();
        //console.log(courseId, instructorId);
        const feedbackObj = {
            courseId:courseId,
            instructorId:courseDetails?.instructorId?._id,
            courseFeedbackId:feedbackDetails?._id

        }
        //feedbackDelete(feedbackObj)
    }

    const handleDeleteFeedbackError = error => {
        console.log(error?.response);
    } */

    const handleUpdateDescriptionSuccess = data => {
        console.log(data);
    }

    const handleUpdateDescriptionError = error => {
        console.log(error?.response);
    }

    const handleUpdateDescription = e => {
        e.preventDefault();
        const courseObj = {
            courseId:courseId,
            courseDescription:courseDescription
        }
        updateCourseDescription(courseObj,handleUpdateDescriptionSuccess,handleUpdateDescriptionError)
        setShowModal(false);
    }

    const {data,isLoading,isFetching} = useGetCourseDetails(courseId,getCourseDetailsSuccess,getCourseDetailsError);
    const {mutate:updateCourseDescription,isLoading:courseDescriptionLoading} = useUpdateCourseDescription();
    const {mutate:updateCourseMaterial,isLoading:courseMaterialLoading} = useUpdateCourseMaterial();
    const {mutate:deleteCourseMaterial,isLoading:deleteCourseMaterialLoading} = useDeleteCourseMaterial();
    //const {mutate:giveFeedback,isLoading:giveFeedbackLoading} = useGiveStudentFeedback(handleGiveFeedbackError);
    
    //const {mutate:feedbackDelete,isLoading:deleteFeedbackLoading} = useDeleteStudentFeedback(courseId,handleDeleteFeedbackError);


    if(isLoading || isFetching  || courseDescriptionLoading || courseDescriptionLoading /* || giveFeedbackLoading */ ){
        return <div><Loader center size="lg" /></div>
    }

    return (
        <>
        <div className='sticky top-0' >
            <InstructorNavbar />
        </div>
        
             <div className=" font-lato">
                
                <div className="">
                    <h3 className='p-3 text-4xl font-bold'>{courseDetails?.courseTitle}</h3>
                    <div className="grid grid-cols-6 mt-10 gap-y-10">
                        <div className="col-span-6 ">
                            <div className='flex flex-row justify-around mx-36'>
                                <h3 className='text-3xl font-bold'>Course Description</h3>
                            </div>
                            
                            <div className="col-span-3">
                                <div className='flex flex-row w-full justify-around py-3 px-10 gap-5'>
                                    <div className=' basis-1/2 min-h-full'>
                                        <Panel bordered header="Course Details" shaded className='min-h-full'>
                                            <div className='font-semibold p-2'>Course Code - <span>{courseDetails?.courseCode}</span></div> 
                                            <div className='font-semibold p-2'>Course level - <span>{courseDetails?.courseLevel}</span></div>
                                            <div className='font-semibold p-2'>Course Credits - <span>{courseDetails?.credits}</span></div>
                                            <div className='font-semibold p-2'>Enrolled Candidates - <span>{courseDetails?.enrolledCandidates}</span></div> 
                                            <div className='font-semibold p-2'>Course Description - <span>{courseDetails?.courseDescription}</span></div>
                                            
                                        </Panel>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 ml-10 mt-10">
                                <h3 className='text-2xl font-bold'>Course Material</h3>
                                <div className='flex flex-row w-full my-3 gap-5 '>
                                    <div className=' basis-2/4 min-h-full'>
                                        <form onSubmit={handleCourseMaterialUpload}>
                                            <div className="flex  justify-between">
                                                <label htmlFor="pdfName" className='bg-indigo-600 text-white  py-2 px-4 rounded-md shadow-md'>
                                                    Select File
                                                </label>
                                                <input type="file" name="pdfName" className="opacity-0 absolute w-0.1 h-0.1 "  onChange={e => setCourseMaterial(e.target.files[0])} />
                                            <button type="submit" className='bg-indigo-600 text-white  py-2 px-4 rounded-md shadow-md' >Upload</button>
                                            </div>
                                        </form>
                                        {courseMaterial && 
                                        <div>
                                            <Panel shaded bordered className="mt-3 bg-gray-200" header="File Details">
                                                <div> File Name - {courseMaterial?.name}</div>
                                                <div> File Size - {`${courseMaterial?.size/1000} KB`}</div> 
                                            </Panel>
                                        </div>}
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className="basis-1/2">
                                    {courseMaterialList?.map(material => (
                                        <Panel key={material?._id} header={material?.courseMaterialTitle} bordered shaded className='mb-3'>
                                            <a href={material?.courseMaterialLink} target="_blank" className="no-underline hover:no-underline" rel="noopener noreferrer">Material Link - {material?.courseMaterialTitle}</a>
                                            <div>Created At - {new Date(material?.createdAt).toDateString()}</div>
                                            <div><button className='bg-red-600 text-white  py-2 px-2 mt-2 rounded-md shadow-md' onClick={() =>  handleCourseMaterialDelete(material?._id)}>Delete Material</button></div>
                                        </Panel>
                                    ))}
                                    </div>
                                </div>
                            </div>

                            <Modal open={showModal} backdrop="static" keyboard={false} onClose={() => setShowModal(false)}>
                                <Modal.Header>Edit Description</Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={handleUpdateDescription}>
                                    <div className='flex w-full justify-center'>
                                        <textarea name="courseDescription" id="courseDescription" cols="70" rows="10" placeholder='Max 700 characters...' value={courseDescription} className='shadow-md rounded-md border-0' onChange={e => setCourseDescription(e.target.value)} required minLength={20} maxLength={700}></textarea>
                                    </div>
                                        <div className='flex w-full justify-end'>
                                        <button type="submit" className="bg-indigo-600 text-white  py-2 px-2 mt-2 rounded-md shadow-md">Update</button>
                                        </div>
                                    </form>
                                </Modal.Body>
                            </Modal>
                            
                            <div className='mt-10 ml-10 mr-10'>
                                <h3 className='text-3xl font-bold'>Enrolled Students</h3>
                                <div className=''>
                                <div className=''>
                                    <PanelGroup accordion >
                                    {courseDetails?.enrolledStudents.map( student => (
                                        <div key={student?._id}>
                                            <Panel bordered header={student?.studentName} shaded className='min-h-full mb-5'>
                                                <div className="flex flex-row gap-2">
                                                    <div className="basis-1/2">
                                                        <div className='font-semibold p-2'>Student Email - <span>{student?.email}</span></div>
                                                        <div className='font-semibold p-2'>Student Contact - <span>{student?.studentContact}</span></div>
                                                        <div className='font-semibold p-2'>Student Address - <span>{student?.studentAddress ==="" ? <span>Nil</span> : student?.studentAddress}</span></div>        
                                                    </div>

                                                    {/* <div className="basis-1/2">
                                                        <StudentFeedbackForm student={student} courseId={courseId} />
                                                    </div> */}

                                                </div>
                                            </Panel>
                                        </div>
                                    ))}
                                    </PanelGroup>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

/* 
{feedbackDetails ? 
    <form onSubmit={handleFeedbackDelete}>
        <textarea name="giveFeedback" id="feedback" cols="40" rows="5" placeholder={feedbackDetails?.feedbackMessage} className='w-full shadow-md rounded-md border-0 bg-gray-100' disabled maxLength={700} minLength={20}></textarea>
        <button type="submit" className="bg-red-600 my-5 text-white py-2 px-5 rounded-md shadow-md">
            <span><WarningRoundIcon /></span> Delete Feedback
        </button>
    </form> : 
    <form onSubmit={handleStudentFeedbackSubmit}>
        <textarea name="giveFeedback" id="feedback" cols="40" rows="5" placeholder='Max 700 characters...' className='w-full shadow-md rounded-md border-0' onChange={e => setStudentFeedback(e.target.value)} required maxLength={700} minLength={20}></textarea>
        <button type="submit" className="bg-indigo-600 my-5 text-white py-2 px-5 rounded-md shadow-md">
            Send Feedback <span><SendIcon /></span>
        </button>
    </form>}

*/

export default ManageCourseInfo