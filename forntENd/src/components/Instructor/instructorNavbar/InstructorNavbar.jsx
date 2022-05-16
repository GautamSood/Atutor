import React from 'react'
import menuimg from "../../../images/menu.png"
import Cookies from 'js-cookie'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogOut } from '../../../hooks/StudentHooks/useLogOut';
import jsCookie from 'js-cookie';

function InstructorNavbar() {
  const navigate = useNavigate();
  const {mutate,isLoading,error} = useLogOut();
  

  const handleLogOut  = () => {
    Cookies.remove("userDetailsCookie");
    mutate();
    navigate("/");
}
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-[#001d60] ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white hover:text-white no-underline hover:no-underline"
              href="/instructorDashboard"
            >
              <div className='flex flex-row'>
                <span><img className="mx-auto h-12 w-auto" src="https://www.designmantic.com/images/industry/education/dm-education-08.jpg" alt="Workflow" /></span>
                <span className='my-auto px-3'>Student Portal (instructor)</span>
              </div>
              
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent  block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <img src={menuimg} alt="processing" className='h-6 w-6 ' />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-gray-100 hover:opacity-75 no-underline hover:no-underline"
                  href="/instructorDashboard"
                >
                  <span className="ml-2">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-gray-100 hover:opacity-75 no-underline hover:no-underline"
                  href="/manageInstructor"
                >
                 <span className="ml-2">Manage</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-gray-100 hover:opacity-75 no-underline hover:no-underline"
                  href="/InstructorProfile"
                >
                  <span className="ml-2">Profile</span>
                </a>
              </li>
              <li  className="nav-item">
                <button onClick={handleLogOut}>
                <span className="ml-2 px-3 py-2 cursor-pointer flex items-center text-xs uppercase font-bold leading-snug text-[#ff0000] hover:text-red-800 no-underline hover:no-underline" >logout</span>                
                </button>
              </li>             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );

}

export default InstructorNavbar