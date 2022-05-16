import './App.css';
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import HomePage from './components/HomePage/HomePage';
import Courses from './components/Courses/Courses';
import Profile from './components/Profile/Profile';
import Admin from './components/Admin/Admin';
import AdminCourses from './components/Admin/AdminTables/AdminCourses/AdminCourses';
import { GlobalProvider } from './context/globalState';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminProfile from './components/Admin/AdminProfile';
import InstructorHomepage from './components/Instructor/InstructorHomepage.jsx/InstructorHomepage';
import ManageInstructor from './components/Instructor/ManageInstructor/ManageInstructor';
import InstructorProfile from './components/Instructor/InstructorProfile/InstructorProfile';
import ViewAdmin from './components/Admin/ViewAdmin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateAdmin from './components/Admin/CreateAdmin';
import ManageCourse from './components/Instructor/ManageCourse/ManageCourse';
import CourseInfo from './components/Courses/CourseInfo';
import AdminManageStudent from './components/Admin/AdminTables/AdminStudents/AdminManageStudent';
import AdminManageInstructor from './components/Admin/AdminTables/AdminInstructor/AdminManageInstructor';
import PageNotFound from './components/PageNotFound';




function App() {
  const queryClient = new QueryClient();
  return (
   <>
   <QueryClientProvider client={queryClient} >
   <ToastContainer limit={5} autoClose={2800} closeOnClick={true} pauseOnHover={true}  />
    <GlobalProvider>
    <Router>
     <Routes>
       <Route path='/' element={<Login />} />
       <Route path='/signup' element={<Signup />} />
       <Route path='/dashboard' element={<HomePage />} />
       <Route exact path="/courses" element = {<Courses />} />
       <Route exact path="/courses/:courseId" element = {<CourseInfo />} />
       <Route exact path="/profile" element = {<Profile />} />
       <Route path='/instructorDashboard' element={<InstructorHomepage />} />
       <Route path='/manageInstructor' element={<ManageInstructor />} />
       <Route path="/manageInstructor/courses/:courseId" element={<ManageCourse />} />
       <Route path='/InstructorProfile' element={<InstructorProfile />} />
       <Route exact path='/Admin' element = {<AdminLogin />} />
       <Route exact path='/Admindashboard' element = {<Admin />} />
       <Route exact path='/AdminCourses' element = {<AdminCourses />} />
       <Route exact path='/AdminStudents' element = {<AdminManageStudent />} />
       <Route exact path='/AdminInstructor' element = {<AdminManageInstructor />} />
       <Route exact path='/AdminProfile' element = {<AdminProfile />} />
       <Route exact path='/ViewAdmin' element = {<ViewAdmin />} />
       <Route exact path='/CreateAdmin' element = {<CreateAdmin />} />
       <Route path='*' element = {<PageNotFound />} />
     </Routes>
     <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </Router>
    </GlobalProvider>
   </QueryClientProvider>

     
      
     

    
   </>
  );
}

export default App;
