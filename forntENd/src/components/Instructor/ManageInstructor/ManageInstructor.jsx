import React,{useState,useEffect} from 'react'
import InstructorNavbar from '../instructorNavbar/InstructorNavbar'
import { useGetAssignedCourses } from '../../../hooks/InstructorHooks/useGetAssignedCourses'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Loader,Panel,Modal,ButtonToolbar,IconButton,Button } from 'rsuite'
import { Plus } from '@rsuite/icons';
import { useCreateCourse } from '../../../hooks/InstructorHooks/useCreateCourse'
import { toast } from 'react-toastify'


const ManageInstructor = () => {
  const navigate = useNavigate();
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Course, setCourse] = useState("")
  const [Description, setDescription] = useState("")
  const [Code, setCode] = useState("")
  const [Duration, setDuration] = useState("")
  const [Level, setLevel] = useState('beginner')
  const [Credits, setCredits] = useState()

  useEffect(() => {
    const userDetailsCookie = Cookies.get("userDetailsCookie");
    if(!userDetailsCookie){
        navigate("/");
    }
}, [navigate]);

const handleSuccess = (data) => {  
  console.log(data?.data?.data?.courses);
  setAssignedCourses(data?.data?.data?.courses);

}
const handleError = (error) => {
  console.log(error?.response)
}

const handleSucessCreateCourse = () => {
  handleClose()
  toast.success("Course added")
}

const handleErrorCreateCourse = (err) => {
  handleClose()
  toast.error("some error occurred")
  console.log(err);
}

const handleSubmit = () => {
  const CourseDetails = {
    courseTitle: Course,
    courseDescription: Description,
    courseDuration: Duration,
    courseLevel : Level,
    courseCode : Code,
    credits : Credits
  }
  mutate(CourseDetails,{
    onSuccess:handleSucessCreateCourse,
    onError:handleErrorCreateCourse
});
}


const {data,isLoading,isError,error,isFetching} = useGetAssignedCourses(handleSuccess,handleError);
const {mutate,isLoading:createCourseIsLoading} = useCreateCourse();


if(isLoading || isFetching || createCourseIsLoading ){
  return <div><Loader center size="lg" /></div>
} 
if(isError){
return <div> error Occurred </div>
} 
  return (
   <>
     <div className='sticky top-0' style={{'zIndex':'22'}}>
        <InstructorNavbar />
      </div>
      <div className='bg-gray-100 min-h-screen' >
      <div className="modal-container">
      <ButtonToolbar>
        <IconButton className='  ml-5 mt-5 rounded-sm py-2' color="green" appearance="primary" icon={<Plus />} onClick={handleOpen}>Add course</IconButton>
      </ButtonToolbar>

      <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
        <Modal.Body>
         
         <form>
          <label htmlFor= "course">Course Title</label>
          <input id="course" name="course" type="text"  required className="w-full border border-gray-100 px-2 mb-4 py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='course' value={Course} onChange={(e) => setCourse(e.target.value)}  />
          
          <label htmlFor= "course-description">Description</label>
          <textarea id="course-description" name="course-description" type="text" minLength={20}  required className="w-full h-[8vw] border mb-4 border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='course-description' value={Description} onChange={e => setDescription(e.target.value)}    />
          
          <label htmlFor= "course-Code">Code</label>
          <input id="course-Code" name="course-Code" type="text"  required className="w-full border mb-4 border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='course-Code'value={Code} onChange={e => setCode(e.target.value)}     />
          
          <label htmlFor= "course-duration">Duration</label>
          <input id="course-duration" name="course-duration" type="text"  required className="w-full border mb-4 border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='course-duration' value={Duration} onChange={e => setDuration(e.target.value)}    />
          
          <label htmlFor= "course-Credits">Credits</label>
          <input id="course-Credits" name="course-Credits" type="number"  required className="w-full border mb-4 border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='course-duration' value={Credits} onChange={e => setCredits(e.target.value)}    />

          <label htmlFor= "course-level">Level</label>
          <select className="form-select form-select-sm mb-3
                                    w-full
                                    px-2
                                    py-2
                                    font-normal
                                    text-gray-600
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-100                                    
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" value = {Level} onChange = { e => setLevel(e.target.value)} >
            <option>beginner</option>
            <option>intermediate</option>
            <option>advanced</option>
          </select>
         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            Submit
          </Button>
          <Button onClick={handleClose} appearance="default">
            Canel
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
         <div className='grid grid-cols-6 pt-8 gap-y-5 gap-x-5 mx-5'>
                        {assignedCourses?.map(course => (<div key={course._id} className="col-span-2">
                            <Panel className='bg-white' bordered header={course?.courseTitle} shaded>
                                    <div>
                                        <p className="text-gray-500 text-sm px-3 py-1">{course?.courseDescription}</p>
                                    </div>
                                    <div className='font-semibold px-3'>Course Code - <span>{course?.courseCode}</span></div>
                                    <div className='font-semibold px-3'>Total Candidates - <span>{course?.enrolledCandidates}</span></div>
                                    <div className='font-semibold px-3'>Course Level - <span>{course?.courseLevel}</span></div>
                                    <div className='font-semibold p-3'>Course Credits - <span className='font-semibold text-indigo-400'>{course?.credits}</span> 
                                    </div>
                                    <a href={`/manageInstructor/courses/${course?._id}`}>
                                      <button className="bg-[#11244e] hover:bg-[#060f24] text-white w-full py-2" >View Course</button>                                   
                                    </a>
                                    
                            </Panel>
                        </div>))}
                    </div>
      </div>
     
   </>
  )
}

export default ManageInstructor