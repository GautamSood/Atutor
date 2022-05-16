import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useGetStudentDetails } from '../../hooks/StudentHooks/getStudentDetail';
import Nav from '../Navbar/Navbar'
import homeImg from "../../images/Study-area.jpg"
import { Loader } from 'rsuite';


function HomePage() {
  const [user,setUser] = useState(null);
  const [feedbacks,setFeedbacks] = useState(null);
  const navigate = useNavigate();
  let count = 0;

  useEffect(() => {
      const userDetailsCookie = Cookies.get("userDetailsCookie");
      console.log(userDetailsCookie);
      //setUser(userDetailsCookie);
      if(!userDetailsCookie){
          navigate("/");
      }
  }, [navigate])

  const handleSuccess = (data) => {
    //console.log(data?.data?.data?.feedbacks);
    console.log(data);
    setUser(data?.data?.data?.user);
    console.log(data?.data?.data?.user);
    setFeedbacks(data?.data?.data?.feedbacks)
}

const {data,isLoading,isError,error} = useGetStudentDetails(handleSuccess);

if(isLoading){
    return <div><Loader center size="lg" /></div>
} 
if(isError){
  return <div> error Occurred </div>
}   
  return (
    <>
      <div className='sticky top-0'>
        <Nav />
      </div>
      <div className='min-h-screen bg-gray-100 pt-5'>
        <div className="bg-white h-45 mx-20 rounded-md shadow-lg  mb-9">
          <div className="flex md:flex-row flex-col">
              <div className ="basis-3/4 px-6 py-3">
                <h1 className="text-lg md:text-5xl font-bold p-4">Hello {user?.studentName} ,</h1>
                <p className=" md:text-xl font-bold p-4">Have a good study</p>
              </div>
              <div className="basis-1/4 ">
                <img src={homeImg}  alt="student" className="pr-3 " />              
              </div>
          </div>
        </div>
        <div className='flex flex-row justify-around mx-20 '>
                        <div className="basis-2/4 px-3">
                              <h3 className="text-lg uppercase font-bold">Currently Enrolled</h3>
                              {/* <p>right side number of courses icon</p> */}
                                  {/* add course limit list to 2 and courseDescription */}
                                  <div>
                                  <ul>
                                  {user?.enrolledInCourses?.length===0 ? <div>No courses to show</div> :
                              user?.enrolledInCourses?.reduce((result,course,i) => { 
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
                              {user?.enrolledInCourses?.length>1 ? <p className="text-right"><a href="/courses">View All</a></p> : <div></div>}
                        {/* </div>
                           <div className="basis-2/4 px-3">
                          <h3 className="text-lg uppercase font-bold">Feedbacks Received</h3>
                           <p>right side number of feedbacks icon</p> 

                              {feedbacks?.length===0 ? <div>No feedbacks to show</div> : feedbacks?.map( feedback => (
                                  <div key={feedback._id}>
                                  <ul>
                                      <li>
                                          <div className="flex flex-row">
                                              <div className="w-full rounded-md bg-white shadow-sm mb-5 mt-3 p-2">
                                                  <h4 className="text-lg">Course / {feedback?.FeedbackBy?.instructorName}</h4>
                                                  <p>{feedback?.feedbackMessage}</p>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                                  if more than 2
                              </div>
                              ))}
                              {feedbacks?.length===0 ? <div></div>:<p className="text-right"><a href="/feedbacks">View All</a></p>}
                          </div>  */}
                          </div>
          </div>
      </div>
    </>
  )
}

export default HomePage