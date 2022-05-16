import AdminNavbar from './AdminNavbar'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetAllCourses } from '../../hooks/StudentHooks/useGetStudentCourses.js';
import { useGetAllStudent } from '../../hooks/StudentHooks/useGetAllStudents';
import { Loader } from 'rsuite';
import { useGetAdminDetails } from '../../hooks/Admin/useGetAdmin';
import adminstudent from '../../images/Study-area.jpg'
import admincourse from '../../images/undraw_Online_learning_re_qw08.png'
import admininstructor from '../../images/undraw_Professor_re_mj1s.png'
import { useGetAllInstructors } from '../../hooks/Admin/useGetAllInstructor';


const Admin = () => {

  const [allCourses,setAllCourses] = useState([]);
  const [allStudents,setAllStudents] = useState([]);
  const [allInstructor, setallInstructor] = useState([]);
  const [user,setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetailsCookie = Cookies.get("userDetailsCookie");
    console.log(userDetailsCookie);
    //setUser(userDetailsCookie);
    if(!userDetailsCookie){
        navigate("/Admin");
    }
}, [navigate])

const handleGetAllCoursesError = (error) => {
  console.log(error.response);
}

const handleGetAllCoursesSuccess = (data) => {
  setAllCourses(data?.data?.data?.courses);
}
const handleGetAllStudentsError = (error) => {
  console.log(error.response);
}

const handleGetAllStudentsSuccess = (data) => {
  
  setAllStudents(data?.data?.data?.admins);

}
const handleGetAllInstructorsError = (error) => {
  console.log(error.response);
}

const handleGetAllInstructorsSuccess = (data) => {
  
  setallInstructor(data?.data?.data?.instructors);

}
const handleAdminDetailsSuccess = (data) => {
  console.log(data);
    setUser(data?.data?.data?.user);
}
const handleAdminDetailsError = (error) => {
    console.log(error?.response)
}
const {data:admindata,isLoading:adminisLoading,isFetching:adminisFetching,isError:adminisError,error:adminerror} = useGetAdminDetails(handleAdminDetailsSuccess,handleAdminDetailsError);
  const {isLoading,data,isError,error,isFetching} = useGetAllCourses(handleGetAllCoursesSuccess,handleGetAllCoursesError); 
  const {isLoading1,data1,isError1,error1,isFetching1} = useGetAllStudent(handleGetAllStudentsSuccess,handleGetAllStudentsError);
  const {isLoading2,data2,isError2,error2,isFetching2} = useGetAllInstructors(handleGetAllInstructorsSuccess,handleGetAllInstructorsError);

  if(isLoading || isFetching || isLoading1 || isFetching1 || isLoading2 || isFetching2 || adminisLoading ){
    return <div><Loader center size="lg" /></div>
}
if(error || error1 || error2 ){
    return <div>error</div>
}

  return (
    <>
    <div className='sticky top-0'>
        <AdminNavbar />
    </div>
    <div className='min-h-screen bg-gray-100'>
    
    

    <div className=' flex flex-row pt-20 '>
    

  <a href='/AdminCourses' className='text-black hover:text-black hover:no-underline'  > 
<div className='bg-white basis-1/3 shadow-md hover:shadow-2xl  rounded-md mx-4 py-2'>
  
<p className='text-2xl text-bold text-center'>Courses</p>
<div className='h-[25vw] w-[30vw]'>       
  <img src={admincourse} alt="course" />
</div>
  <p className='text-md '>Total: {allCourses.length}</p>   
</div>
</a>

<a href='/AdminStudents' className='text-black hover:text-black hover:no-underline' >  
<div className='bg-white basis-1/3 shadow-md hover:shadow-2xl  py-2 rounded-md mx-4'>
<p className='text-2xl text-bold text-center'>Students</p>
<div className='h-[25vw] w-[30vw]'>
   
    <img src={adminstudent} alt="student" />              

</div>
 
<p className='text-md '>Total: {allStudents.length}</p> 
</div>
</a>

<a href='/AdminInstructor' className='text-black hover:text-black hover:no-underline'  >   
<div className='bg-white basis-1/3 shadow-md hover:shadow-2xl py-2 rounded-md mx-4'>
<p className='text-2xl text-bold text-center'>Instructor</p>
<div className='h-[25vw] w-[30vw]'>
       
    <img src={admininstructor} alt="instructor" />        

</div>
 
   <p className= ' text-md' >Total: {allInstructor.length}</p> 


</div>
</a> 
</div>
    </div>
    
    </>
  )
}

export default Admin