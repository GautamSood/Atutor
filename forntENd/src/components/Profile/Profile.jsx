import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import Nav from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useGetStudentDetails } from '../../hooks/StudentHooks/getStudentDetail';
import { Loader, Message } from 'rsuite';
import { useUpdateStudentDetails } from '../../hooks/StudentHooks/getUpdateStudentDetails';
import { toast } from 'react-toastify';

const Profile = () => {
    const [editProfileState,setEditProfileState] = useState(false);
    const [disabledInputState,setDisabledInputState] = useState(true);
    const [user,setUser] = useState(null);
    const [studentContact,setStudentContact] = useState("");
    const [studentAddress,setStudentAddress] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/");
        }
    }, [navigate])

    const handleStudentDetailsSuccess = (data) => {
        setUser(data?.data?.data?.user);
        setStudentAddress(data?.data?.data?.user?.studentAddress);
        setStudentContact(data?.data?.data?.user?.studentContact);
    }

    const handleStudentDetailsError = (error) => {
        console.log(error?.response)
    }
    
    const {data,isLoading,isFetching,isError,error} = useGetStudentDetails(handleStudentDetailsSuccess,handleStudentDetailsError);
    const {mutate,isLoading:updateDetailLoading,} = useUpdateStudentDetails()

    const handleEditProfileState = () => {
        setEditProfileState(!editProfileState);
        setDisabledInputState(!disabledInputState);
    }

    const handleUpdateDetailsSuccess = (data) => {
        toast.success("Profile Updated")

    }

    const handleUpdateDetailsError =(error) => {
        console.log(error?.response);
    }

    const handleUpdateDetails = (e) => {
        e.preventDefault();
        const studentDetails= {
            studentContact:studentContact,
            studentAddress:studentAddress
        }
        mutate(studentDetails,{
            onSuccess:handleUpdateDetailsSuccess,
            onError:handleUpdateDetailsError
        })
        //console.log(studentContact,studentAddress);
        setEditProfileState(!editProfileState);
        setDisabledInputState(!disabledInputState);
    }

    if(isLoading || isFetching) {
        return <div><Loader center size="lg" /></div>
    }
  return (
    <>
        <div className='sticky top-0'>
        <Nav />
      </div>
        <div className='font-lato'>
              
            <div className='bg-gray-100 min-h-screen'>
                
                <div className='pt-10 gap-y-5 gap-x-5 mx-5'>
                    <div className=" mx-[20vw] shadow-lg">
                        <div className='p-3  bg-white rounded-md'>
                        <div className='flex flex-row'>
                        <div className=" basis-1/5 p-2 ">
                                    <div className = "bg-gray-400 rounded-full w-20 h-20 border-2 flex items-center justify-center shadow-lg">
                                        <p className='text-white text-3xl font-bold'>{user?.studentName?.charAt(0)?.toUpperCase()}</p> {/* place it in center  */}
                                    </div>
                                    <br></br>
                                    <div className=' px-4'>                         
                                <p className='text-lg'>Name: {user?.studentName}</p>
                                
                                
                                </div>
                            </div>
                            
                        <form onSubmit={handleUpdateDetails} className="basis-4/5" >                    
                             
                           
                            
                            <div className='flex md:flex-row flex-col justify-between mb-10 px-4'>
                            <div className='basis-1/2'>
                                
                                <label htmlFor="contact">Contact</label> <br />
                                {disabledInputState ? <input 
                                type="text" name="contact"  placeholder={user?.studentContact}
                                className="text-sm text-gray-base w-full
                                        py-5 px-4 h-2 mt-2 border 
                                        border-gray-200 rounded mb-2" 
                                        disabled
                                /> : 
                                <input 
                                type="text" name="contact"  placeholder={user?.studentContact}
                                className="text-sm text-gray-base w-full
                                        py-5 px-4 h-2 mt-2 border 
                                        border-gray-200 rounded mb-2" onChange={e => setStudentContact(e.target.value)} />
                                }
                            </div>
                                <div className='basis-1/2'>
                                <label htmlFor="age " className='ml-3 mr-3'>Age</label> <br />
                                <input 
                                    type="text" name="age"  placeholder={user?.studentAge}
                                    className="text-sm text-gray-base w-full ml-3 mr-3
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                        disabled/>
                                </div>
                               
                            </div>
                            
                                <div className='flex flex-row justify-between mb-10 px-4'>
                                <div className='w-full'>
                                <label htmlFor="gender">Gender</label> <br />
                                <input 
                                    type="text" name="gender"  placeholder={user?.studentGender}
                                    className="text-sm text-gray-base w-full 
                                            py-5 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                            disabled/>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between mb-10 px-4'>
                                <div className='w-full'>
                                <label htmlFor="email">Email</label> <br />
                                <input 
                                    type="text" name="email"  placeholder={user?.email}
                                    className="text-sm text-gray-base w-full 
                                            py-5 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                            disabled/>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between mb-10 px-4'>
                            <div className='w-full'>
                            <label htmlFor="address">Address</label> <br />
                                {disabledInputState ? <input 
                                    type="text" name="address"  placeholder={user?.studentAddress}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                            disabled
                                    /> : 
                                    <input 
                                    type="text" name="address"  placeholder={user?.studentAddress}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setStudentAddress(e.target.value)}/>
                                    }
                                </div>
                            </div>
                            {editProfileState ? <div className = "flex flex-row gap-2 pb-5">

                                <div className="basis-1/2 px-3">
                                    <button className="bg-red-600 hover:bg-red-800 mt-4 text-white h-10 w-full" onClick = {handleEditProfileState}>
                                            Cancel
                                    </button>
                                </div>    
                                <div className="basis-1/2 px-3">
                                    <button type="submit" className="hover:bg-[#0f172a] bg-[#0d2660] mt-4 text-white h-10 w-full">
                                            Update Details
                                    </button>
                                </div>
                            </div> : 
                            <div className="flex flex-row px-3 pb-5">
                                    
                                <button className="hover:bg-[#0f172a] bg-[#0d2660] mt-4 text-white h-10 w-full" onClick = {handleEditProfileState}>
                                        Edit Profile
                                </button>
                            </div>
                            }
                        </form>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>   
    </>
  )
}

export default Profile