import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useGetAllCourses } from '../../hooks/StudentHooks/useGetStudentCourses.js';
import { useEnrollCourse } from '../../hooks/StudentHooks/useEnrollCourse';
import {useGetEnrolledCourses} from "../../hooks/StudentHooks/useGetEnrolledCourses"
import { Loader, Panel } from 'rsuite';
import { useExitCourse } from '../../hooks/StudentHooks/useExitCourse';
import CloseIcon from '@rsuite/icons/Close';
import SearchIcon from '@rsuite/icons/Search';
import PlusIcon from '@rsuite/icons/Plus';





const Courses = () => {
    const navigate = useNavigate();
    const [allCourses,setAllCourses] = useState([]);
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    const [errorMessage,setErrorMessage] = useState("");
    const [searchTerm,setSearchTerm] = useState("");
    const [filteredList,setFilteredList] = useState();
    const [filteredEnrolledList,setFilteredEnrolledList] = useState();
    
    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/");
        }
        const unEnrolledCourses = allCourses.filter(course => !(enrolledCourses.find(courseEnrolled => courseEnrolled._id === course._id)));
        const filteredData = unEnrolledCourses.filter((course)=>course?.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()));
        //create filter for enrolled courses
        setFilteredEnrolledList(enrolledCourses);
        setFilteredList(filteredData);
    }, [navigate,allCourses,searchTerm,enrolledCourses]);

    const handleEnrollCourseSuccess = (data) => {
        console.log(data);
    }

    const handleEnrollCourseError = (error) => {
        console.log(error.response)
    }

    const handleEnrollCourse = (courseId) => {
        mutate(courseId,{
            onSuccess:handleEnrollCourseSuccess,
            onError:handleEnrollCourseError
        });
    }

    const handleGetEnrolledCourseSucess = (data) => {
        //console.log(data)
        setEnrolledCourses(data?.data?.data);
    }
    const handleGetEnrolledCourseError = (error) => {
        console.log(error.response);
    }

const handleGetAllCoursesSuccess = (data) => {
    setAllCourses(data?.data?.data?.courses);
}

const handleGetAllCoursesError = (error) => {
    setErrorMessage(error?.response?.data?.message);
}

    const handleExitCourseSuccess = (data) => {
        console.log(data);
    }

    const handleExitCourseError = (error) => {
        console.log(error.response);
    }

    const handleExitCourse = (courseId) => {
        exitCourseMuatate(courseId,{
            onSuccess:handleExitCourseSuccess,
            onError:handleExitCourseError
        })
    }

    const {isLoading,data,isError,error,isFetching} = useGetAllCourses(handleGetAllCoursesSuccess,handleGetAllCoursesError); 
    const {data:studentData,isLoading:studentDetailsLoading,isError:IsStudentDetailsError,error:studentDetailsError} = useGetEnrolledCourses(handleGetEnrolledCourseSucess,handleGetEnrolledCourseError);
    const {mutate,isLoading:courseEnrollLoading} = useEnrollCourse();
    const {mutate:exitCourseMuatate,isLoading:exitCourseLoading} = useExitCourse();

    //console.log(enrolledCourses);

    if(isLoading || isFetching ||studentDetailsLoading ){
        return <div><Loader center size="lg" /></div>
    }
    if(error){
        return <div>{errorMessage}</div>
    }
    return (
        <>
        <div className='sticky top-0'>
            <Navbar />
        </div>
            
            <div className='bg-gray-100 min-h-screen   font-lato'>                
                <div className='mx-20 py-8'>

                    <br></br>
                    <div className="col-span-5 mx-20">
                    <form>
                        <input 
                        type="text" name="SearchBar" placeholder="Search Course"
                        className="text-md text-gray-base border border-gray-200 rounded-md w-full px-2 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 " onChange={(e)=>setSearchTerm(e.target.value)} />
                    </form>
                    </div>
                    <h3 className="text-3xl font-bold pt-6"> Enrolled Courses</h3>
                    {enrolledCourses.length===0 &&  <h5 className=' text-gray-500 font-bold'>Not enrolled in any course!</h5>}
                    <div className='grid grid-cols-6 mt-10 gap-y-5 gap-x-5 mb-5 '>
                        {enrolledCourses?.map(course => (<div key={course._id} className="col-span-3">
                            <Panel className='bg-white' bordered shaded>
                                <div className='flex justify-end '>
                                    <button className=" text-red-600 text-lg " onClick={() =>handleExitCourse(course?._id)}>< CloseIcon/></button>
                                </div>
                            
                                <div className='flex flex-row'>
                                <p className=" text-lg px-3 py-1">{course?.courseTitle}</p> 
                                                              
                                </div>
                                    <div>
                                        <p className="text-gray-500 text-sm px-3 py-1">{course?.courseDescription}</p>
                                    </div>
                                    <div className='font-semibold px-3'>Course level - <span>{course?.courseLevel}</span></div>
                                    <div className='font-semibold p-3'>Instructor - <span className='font-semibold text-indigo-400'>{course?.instructorId?.instructorName}</span> 
                                    </div>
                                    
                                    <a href={`/courses/${course?._id}`}>
                                        <button className="bg-[#11244e] hover:bg-[#060f24] text-white py-2 mt-2 w-full rounded-md shadow-md">View Course</button>
                                    </a>
                            </Panel>
                        </div>))}
                        {/* make button if already enrolled and want to exit */}
                    </div>
                    <h3 className="text-3xl font-bold mt-2 "> All Courses</h3>   {/* add spacing from card above */}
                    <div className='grid grid-cols-6 mt-10 gap-y-5 gap-x-5 mx-5'>
                        {filteredList?.map(course => (<div key={course._id} className="col-span-2">
                            <Panel className='bg-white' bordered  shaded>
                            <div className='flex justify-end '>
                                   <button className=" text-gray-500 py-2 text-xl" onClick={() =>handleEnrollCourse(course?._id)}><PlusIcon /></button>
                                </div>
                                <p className=" text-lg px-3 py-1">{course?.courseTitle}</p> 
                                    <div>
                                        <p className="text-gray-500 text-sm px-3 py-1">{course?.courseDescription}</p>
                                    </div>
                                    <div className='font-semibold px-3'>Course level - <span>{course?.courseLevel}</span></div>
                                    <div className='font-semibold p-3'>Instructor - <span className='font-semibold text-indigo-400'>{course?.instructorId?.instructorName}</span> 
                                    </div>
                                    
                                    <a href={`/courses/${course?._id}`}>
                                        <button className="bg-[#11244e] hover:bg-[#060f24] text-white w-full py-2 mt-2 rounded-md shadow-md">View Course</button>
                                    </a>
                            </Panel>
                        </div>))}
                    </div>
                </div>
            </div> 
        </>  
    )
}

/* 
<div className='col-span-2' key={course?._id}>
    <div className="flex flex-col shadow-lg border-1">  
        <div>
            <h3 className='text-2xl font-bold p-3'>{course?.courseTitle}</h3>
        </div>
        <div>
            <p className="text-gray-500 text-sm px-3">{course?.courseDescription}</p>
            </div>
            <div className='font-semibold px-3'>Course level - <span>{course?.courseLevel}</span></div>
            <div className='font-semibold p-3'>Instructor - <span className='font-semibold text-indigo-400'>{course?.instructorId?.instructorName}</span> 
            </div>
            <button className="bg-indigo-400 text-white w-full py-2" onClick={() =>handleEnrollCourse(course?._id)}>Enroll</button>
        </div>
    </div>
*/

export default Courses