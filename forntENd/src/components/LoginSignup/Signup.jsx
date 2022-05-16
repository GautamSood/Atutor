import React from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom";
import { useSignUpStudent } from '../../hooks/StudentHooks/useSignupStudent';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useSignUpInstructor } from '../../hooks/InstructorHooks/useSignupInstructor';
import { Loader } from 'rsuite';
import {toast} from "react-toastify";

function Signup() {

    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
      name:Yup.string().required("Name is required!"),
      email:Yup.string().required("Please provide an email address!").email("Please provide a valid email!"),
      contact:Yup.string().required("Contact number is required!").min(10,"Contact must be 10 digits!").max(10,'Contact must be 10 digits!'),
      age:Yup.number().required("Age is required!"),
      password: Yup.string()
        .required("Password is required!")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must not exceed 20 characters"),
        // .matches(
        //   "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
        //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        // )
      confirmPassword: Yup.string()
        .required("Confirm Password is required!")
        .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
      role:Yup.string().required("select a role!"),
      address:Yup.string().required("address is required!")
    })
    const formik = useFormik({
      initialValues:{
        name:"",
        email:"",
        contact:"",
        age:1,
        role:"Student",
        gender:"Male",
        password:"",
        confirmPassword:"",
        address:""
      },validationSchema,
      validateOnBlur:true,
      onSubmit: (data) => {
        if(data.role ==="Instructor"){
          const instructorObj={
            instructorName:data.name,
            email:data.email,
            instructorContact:data.contact,
            instructorAddress:data.address,
            instructorPassword:data.password,
            passwordConfirm:data.confirmPassword,
            gender:data.gender
          }
          signUpInstructor(instructorObj,{
            onSuccess:handleSuccess,
            onError:handleError
          });
        }
        else if(data.role==="Student"){
          const studentObj ={
            studentName:data.name,
            email:data.email,
            studentPassword:data.password,
            studentContact:data.contact,
            studentAge:data.age,
            studentGender:data.gender,
            studentAddress:data.address,
            passwordConfirm:data.confirmPassword
          }
          signUpStudent(studentObj,{
            onSuccess:handleSuccess,
            onError:handleError
          });
        }
      }
    })
  
    const handleError = (err) => {
      console.log(err?.response?.data?.messages?.errors);
      setErrorMessage(err.response.data.message);
      toast.error("error occured")
    }
  
    const handleSuccess = (data) => {
      
      navigate("/")
      toast.success("user added")
    }
    const {mutate:signUpStudent,error,isLoading} = useSignUpStudent();
  const {mutate:signUpInstructor,error:signUpInstructorError,isLoading:signUpInstructorLoading} = useSignUpInstructor();
  
  if(isLoading || signUpInstructorLoading){
   return <div><Loader center size="lg" /></div>
  }
    
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-12 w-auto" src="https://www.designmantic.com/images/industry/education/dm-education-08.jpg" alt="Workflow" />
            
            
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Course Management System</h2>
            <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Already registered?
            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"> Sign in</a>
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form className="mb-0 space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
                    <div className="mt-1">
                        <input id="name" name="name" type="name" autoComplete="name"  className="w-full border border-gray-100 px-2 py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='name'  value={formik.values.name}    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}/>
                    </div>
                    <div className='text-red-600'>
                                  {formik.touched.name && formik.errors.name ? formik.errors.name : null}
                                </div>
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address*</label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email"  autoComplete="email"   value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='email' />
                    </div>
                    <div className='text-red-600'>
                                  {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                                </div>
                    </div>

                    <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password"  autoComplete="password"  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='password' />
                    </div>
                    <div className='text-red-600'>
                                  {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                                </div>
                    </div>

                    <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password*</label>
                    <div className="mt-1">
                        <input id="confirmPassword" name="confirmPassword" type="password"  autoComplete="password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='confirm password' />
                    </div>
                    <div className='text-red-600'>
                                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
                                </div>
                    </div>

                    <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Phone No.*</label>
                    <div className="mt-1">
                        <input id="contact" name="contact" type="text" value={formik.values.contact} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none" placeholder='contacts details' />
                    </div>
                    <div className='text-red-600'>
                                      {formik.touched.contact && formik.errors.contact ? formik.errors.contact : null}
                                    </div>
                    </div>

                    <div className='flex flex-row'>
                        <div className='basis-1/2'>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age*</label>
                        <div className="mt-1">
                            <input id="age" name="age" type="number" min="1"  value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="w-[11vw] border border-gray-100 px-2 py-2  rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none" placeholder='age' />
                        </div>
                        <div className='text-red-600'>
                                  {formik.touched.age && formik.errors.age ? formik.errors.age : null}
                                </div>
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender*</label>
                        <div className="mt-1">
                        <select name='gender'  value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="form-select form-select-sm mb-3
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
                                   
                                    >
                                       <option value="male" >Male</option>
                                        <option value="female" >Female</option>
                                        <option value="Others" >Others</option>
                                    </select>
                        </div>
                        <div className='text-red-600'>
                                  {formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}
                                </div>
                        </div>                    
                    </div> 
                    <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Sign In As*</label>
                    <div className="mt-1">
                    <select name='role' value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select form-select-sm mb-3
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
                                   
                                    >
                                        
                                        <option value="Students" >Students</option>
                                        <option value="Instructor" >Instructor</option>
                                    </select>
                    </div>
                    <div className='text-red-600'>
                                  {formik.touched.role && formik.errors.role ? formik.errors.role : null}
                                </div>
                    </div>     

                    <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address*</label>
                    <div className="mt-1">
                        <input id="address" name="address" type="text" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='address' />
                    </div>
                    <div className='text-red-600'>
                                  {formik.touched.address && formik.errors.address ? formik.errors.address : null}
                                </div>
                    </div>  

                    <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0f172a] hover:bg-[#0d2660] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup