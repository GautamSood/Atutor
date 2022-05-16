import React from 'react'
import { useState,useEffect } from 'react';
import { Loader } from 'rsuite';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import { useLoginAdmin } from '../../../hooks/Admin/useGetAdminLogin'; 

const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const {mutate,isLoading} = useLoginAdmin();
    const navigate = useNavigate();

    const setUserCookie =(data) => {
        console.log(data)
        Cookies.set("userDetailsCookie",data?.data?.data?.user);
        //console.log(Cookies.get("userDetailsCookie"));
        navigate("/Admindashboard");
    }

    const handleError = (error) => {
        setErrorMessage(error?.response?.data?.message);
    }

    const handleSubmit = (e) => {
        e.preventDefault();        
        const adminDetails= {
        email:email,
        adminPassword:password
        }
        mutate(adminDetails,{
        onSuccess:setUserCookie,
        onError:handleError
        });
        
        setEmail("");
        setPassword("");
    }


    if(isLoading){
        return <div><Loader center size="lg" /></div>
    }
    

  return (
    <>
         <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
    
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="https://www.designmantic.com/images/industry/education/dm-education-08.jpg" alt="Workflow" />
        
       
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Course Management System</h2>
        <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">Login Your Account</h2>
        
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="mb-0 space-y-06 "  >
            

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email address*</label>
                <div className="mt-1">
                    <input id="email" name="email" type="email" autoComplete="email" required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value) } />
                </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password*</label>
                    <div className="mt-1">
                    <input id="password" name="password" type="password" autoComplete="password" required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value) } />
                    </div>
                </div>  
                
                {errorMessage && <div className='flex flex-row justify-around px-1 pt-6'>
                
                          <div className=' border-2 border-red-500 rounded'>
                            <h4 className='text-normal font-bold text-red-700'>{errorMessage}</h4>
                          </div>
                        </div>} 

                        <br></br>       

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

export default AdminLogin