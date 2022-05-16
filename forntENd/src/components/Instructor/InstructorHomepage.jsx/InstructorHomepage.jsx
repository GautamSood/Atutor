import React,{useState,useEffect} from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'
import InstructorNavbar from '../instructorNavbar/InstructorNavbar'
import homeImg from '../../../images/undraw_Professor_re_mj1s.png'
import { useGetInstructorDetails } from '../../../hooks/InstructorHooks/useGetInstructor';
import { Loader } from 'rsuite';

const InstructorHomepage = () => {
const navigate = useNavigate();
const [user, setUser] = useState("");
const [instructorCourses, setinstructorCourses] = useState([]);
const [feedbacks, setFeedbacks] = useState([]);

useEffect(() => {
    const userDetailsCookie = Cookies.get("userDetailsCookie");
    if(!userDetailsCookie){
        navigate("/");
    }
}, [navigate]);

const handleSuccess = (data) => {
  
  console.log(data);
  setUser(data?.data?.data?.user);
  setinstructorCourses(data?.data?.data?.user?.coursesAssigned);
  console.log(data?.data?.data?.feedbacks);
   setFeedbacks(data?.data?.data?.feedbacks);
}
const handleError = (error) => {
  console.log(error?.response)
}

const {data,isLoading,isError,error} = useGetInstructorDetails(handleSuccess,handleError);

if(isLoading){
  return <div><Loader center size="lg" /></div>
} 
if(isError){
return <div> error Occurred </div>
}   
  return (
    <>
    <div >
    <div className='sticky top-0'>
        <InstructorNavbar />
      </div>
      <div className='min-h-screen bg-gray-100 py-5'>
        <div className="bg-white h-45 mx-20 rounded-md shadow-lg  mb-9">
          <div className="flex md:flex-row flex-col">
              <div className ="basis-3/4 px-6 py-3">
                <h1 className="text-lg md:text-5xl font-bold p-4">Hello, {user?.instructorName} </h1>
                <p className=" md:text-xl font-bold p-4">Time To Teach</p>
              </div>
              <div className="basis-1/4 ">
                <img src={homeImg}  alt="student" className="pr-3 " />              
              </div>
          </div>
        </div>
        <div>
        <div className='flex flex-row justify-around mx-20 '>
                        <div className="basis-2/4 px-3">
                              <h3 className="text-lg uppercase font-bold">Courses</h3>
                              {/* <p>right side number of courses icon</p> */}
                                  {/* add course limit list to 2 and courseDescription */}
                                  <div>
                                  <ul>
                                  {instructorCourses?.length===0 ? <div>No courses to show</div> :
                              instructorCourses?.reduce((result,course,i) => { 
                                if(i<2){
                                  result.push(
                                     <li key={course._id}>
                                          <div className="flex flex-row">
                                              <div className="w-full bg-white rounded-md shadow-sm mb-5 mt-3 p-2">
                                                  <h4 className="text-lg">{course.courseTitle}</h4>
                                                  <p>{course?.courseDescription}</p>
                                                  <p><span className="font-bold">Course Duration</span> {course.courseDuration}</p>
                                              </div>
                                          </div>
                                      </li>
                                  )
                                }
                                return result
                              },[])}
                                  </ul>
                              </div>
                              {/* is more than 2 */}
                              {instructorCourses?.length>1 ? <p className="text-right"><a href="/manageInstructor">View All</a></p> : <div></div>}
                        </div>
                          <div className="basis-2/4 px-3">
                          <h3 className="text-lg uppercase font-bold">Feedbacks Received</h3>
                          <br></br>
                          {/* <p>right side number of feedbacks icon</p> */}

                              {feedbacks?.length===0 ? <div>No feedbacks to show</div> : feedbacks?.map( feedback => (
                                  <div key={feedback._id}>
                                  <ul>
                                      <li>
                                          <div className="flex flex-row">
                                              <div className="w-full rounded-md bg-white shadow-sm mb-1  p-2">
                                                  <h4 className="text-lg">{feedback?.courseId?.courseTitle} / {feedback?.studentId?.studentName}</h4>
                                                  <p>{feedback?.feedbackMessage}</p>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                                  {/* if more than 2 */}
                              </div>
                              ))}
                              {feedbacks?.length===0 ? <div></div>:<p className="text-right"><a href="/instructorDashboard">View All</a></p>}
                          </div>
          </div>
        </div>
        
      </div>
    </div>
    
    </>
  )
}

export default InstructorHomepage