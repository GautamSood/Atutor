import React from 'react'
import {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {globalContext} from "../../context/globalState";
import { Loader } from 'rsuite';
import { useLoginStudent } from '../../hooks/StudentHooks/useLoginStudent.js';
import { useLoginInstructor } from '../../hooks/InstructorHooks/useLoginInstructor';
import * as Yup from "yup";
import { useFormik } from 'formik';

function Login() {

   
    const [errorMessage,setErrorMessage] = useState("");
    
    const {mutate,isLoading} = useLoginStudent();
    const {mutate:mutating,isLoading1} =  useLoginInstructor();
    const navigate = useNavigate();
    
    

    const setUserCookie =(data) => {
        console.log(data);
        if(data?.data?.data?.user.role === "student"){
            Cookies.set("userDetailsCookie",data?.data?.data?.user);
            console.log(Cookies.get("userDetailsCookie"));
            navigate("/dashboard");
        }
        
        //console.log(cookie.userDetailsCookie);
       
       
        
        
        else if(data?.data?.user.role === "instructor"){
            Cookies.set("userDetailsCookie",data?.data?.user);
            console.log(Cookies.get("userDetailsCookie"));
            navigate("/instructorDashboard")
        }
        
    }
    const validationSchema = Yup.object().shape({
           
        email:Yup.string().required("Please provide an email address!").email("Please provide a valid email!"),
        password: Yup.string()
          .required("Password is required!")
          .min(8, "Password must be at least 8 characters")
          .max(20, "Password must not exceed 20 characters"),
        
      })
      const formik = useFormik({
        initialValues:{
          
          email:"",
         
          role:"Student",
    
          password:""
         
        },validationSchema,
        validateOnBlur:true,
        onSubmit: (data) => {
            
            if(data.role === "Student"){
                const studentDetails= {
                email:data.email,
                studentPassword:data.password
                }
                mutate(studentDetails,{
                    onSuccess:setUserCookie,
                    onError:handleError
                });
            }
            else if(data.role === "Instructor") {
                const instructorDetails= {
                email:data.email,
                instructorPassword:data.password
                }
                mutating(instructorDetails,{
                    onSuccess:setUserCookie,
                    onError:handleError
                });
            }
            
        }
      })

    const handleError = (error) => {
        setErrorMessage(error?.response?.data?.message);
    }
   
    if(isLoading || isLoading1){
        return <div><Loader center size="lg" /></div>
    }
  return (
    <>    
    
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
    
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-12 w-auto" src="https://www.designmantic.com/images/industry/education/dm-education-08.jpg" alt="Workflow" />
            
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Course Management System</h2>
            <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">Login Your Account</h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Not registered?
            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"> Sign-up </a>
            here
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form onSubmit={formik.handleSubmit} className="mb-0 space-y-06 "  >
                

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email address*</label>
                    <div className="mt-1">
                        <input id="email" name="email"  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="email" required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='email'  />
                    </div>
                    <div className='text-red-600'>
                                      {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                                    </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password*</label>
                        <div className="mt-1">
                        <input id="password" name="password" type="password" autoComplete="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='password'  />
                        </div>
                        <div className='text-red-600'>
                                      {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                                    </div>
                    </div>  
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700"> Sign In As*</label>
                        <div className="mt-1">
                        <select name='role' className="form-select form-select-sm mb-3
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
                                    shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    >
                                        <option value="Student" >Student</option>
                                        <option value="Instructor" >Instructor</option>
                                    </select>
                                    <div className='text-red-600'>
                                      {formik.touched.role && formik.errors.role ? formik.errors.role : null}
                                    </div>
                        </div>
                    </div>
                    {errorMessage && <div className='flex flex-row justify-around px-3 py-1'>
                              <div className=' border-2 border-red-500 rounded'>
                                <h4 className='text-normal font-bold text-red-700'>{errorMessage}</h4>
                              </div>
                            </div>}        

                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0f172a] hover:bg-[#0d2660] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    </div>    
    </>
  )
}

export default Login