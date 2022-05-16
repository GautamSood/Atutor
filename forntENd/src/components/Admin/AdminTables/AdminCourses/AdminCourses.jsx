import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../AdminNavbar';
import Cookies from "js-cookie";
import { useNavigate,useParams } from 'react-router-dom';
import { useGetAllCourses } from '../../../../hooks/StudentHooks/useGetStudentCourses';
import { Loader, Modal, Panel } from 'rsuite';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import { useDeleteCourse } from '../../../../hooks/Admin/useDeleteCourse';
import { useExitCourse } from '../../../../hooks/StudentHooks/useExitCourse';
import TrashIcon from '@rsuite/icons/Trash';

const AdminCourses = () => {

    const navigate = useNavigate();
    const [allCourses,setAllCourses] = useState([]);
    const [errorMessage,setErrorMessage] = useState("");
    const [showAlertDialog,setShowAlertDialog] = useState(false);
    const [modalDataCaution, setmodalDataCaution] = useState("")

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate,allCourses]);    
    
    
    const handleGetAllCoursesSuccess = (data) => {
        setAllCourses(data?.data?.data?.courses);
    }

    const handleGetAllCoursesError = (error) => {
        setErrorMessage(error?.response?.data?.message);
    }

    const handleDeleteCourse = courseId => {
        setShowAlertDialog(false);
        deleteCourse(courseId);
    }
    const handleDeleteCourseError = error => {
        console.log(error?.response)
    }
    const deleteModal = course => {
        setmodalDataCaution(course?._id)
        setShowAlertDialog(true)
    }
    const deletingStudent = () => {

        handleDeleteCourse(modalDataCaution)
    }

    const {isLoading,data,isError,error,isFetching} = useGetAllCourses(handleGetAllCoursesSuccess,handleGetAllCoursesError);
    const {mutate:deleteCourse,isLoading:deleteStudentLoading} = useDeleteCourse(handleDeleteCourseError)

    if(isLoading || isFetching || deleteStudentLoading ){
        return <div><Loader center size="lg" /></div>
    }
    if(error){
        return <div>{errorMessage}</div>
    }

  return (
      <>
        <div className='sticky top-0'>
            <AdminNavbar />
        </div>
        <div >
        <h3 className="text-3xl font-bold mt-2 mx-3 "> All Courses</h3>   {/* add spacing from card above */}
                    <div className='grid grid-cols-6 mt-10 gap-y-5 gap-x-5 mx-5'>
                        {allCourses?.map(course => (<div key={course._id} className="col-span-2">
                            <Panel className='bg-white' bordered header={course?.courseTitle} shaded>
                            
                                    <div>
                                        <p className="text-gray-500 text-sm px-3 py-1">{course?.courseDescription}</p>
                                    </div>
                                    <div className='font-semibold px-3'>Course level - <span>{course?.courseLevel}</span></div>
                                    <div className='font-semibold px-3'>Total Candidates - <span>{course?.enrolledCandidates}</span></div>
                                    <div className='font-semibold px-3'>Credits - <span>{course?.credits}</span></div>
                                    <div className='font-semibold p-3'>Instructor - <span className='font-semibold text-indigo-400'>{course?.instructorId?.instructorName}</span> 
                                    </div>
                                    <div className='flex flex-row justify-end'>
                                        <button className="text-xl text-red-600 py-2 " onClick={()=>deleteModal(course)}><TrashIcon /></button>
                                    </div>
                                    
                                                                       
                                    {showAlertDialog===true && 
                                            <>
                                                <Modal backdrop="static" role="alertdialog" open={showAlertDialog} onClose={() =>setShowAlertDialog(false)} size="xs">
                                                <Modal.Body>
                                                
                                                <RemindFillIcon style={{color:"red"}} /> <span className='font-bold'>All information related to course would be deleted forever. Are you sure you want to proceed ?</span>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <button onClick={deletingStudent} className="bg-red-600 text-white px-3 py-2 rounded-md shadow-md m-1">
                                                    Ok
                                                </button>
                                                <button onClick={() => setShowAlertDialog(false)} className="bg-gray-600 text-white px-3 py-2 rounded-md shadow-md m-1">
                                                    Cancel
                                                </button>
                                                </Modal.Footer>
                                            </Modal>
                                            </>}
                            </Panel>
                        </div>))}
                    </div>
        </div>
      </>
  )
}

export default AdminCourses