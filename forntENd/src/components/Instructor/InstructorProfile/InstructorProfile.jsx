import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"; 
import InstructorNavbar from '../instructorNavbar/InstructorNavbar';
import { useGetInstructorDetails } from '../../../hooks/InstructorHooks/useGetInstructor';
import { Loader } from 'rsuite';
import {toast} from "react-toastify";
import { useUpdateInstructorDetails } from '../../../hooks/InstructorHooks/useUpdateInstructor';

const AdminProfile = () => {
    const [Contact,setContact] = useState("");
    const [Address,setAddress] = useState("");
    const [Name,setName] = useState("");
    const [editProfileState,setEditProfileState] = useState(false);
    const [disabledInputState,setDisabledInputState] = useState(true);
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

            useEffect(() => {
                const userDetailsCookie = Cookies.get("userDetailsCookie");
                if(!userDetailsCookie){
                    navigate("/");
                }
            }, [navigate])
    
    const handleEditProfileState = () => {
        setEditProfileState(!editProfileState);
        setDisabledInputState(!disabledInputState);
    }

    const handleInstructorDetailsSuccess = (data) => {  
        console.log(data);    
        setUser(data?.data?.data?.user);
        setAddress(data?.data?.data?.user?.instructorAddress);
        setContact(data?.data?.data?.user?.instructorContact);



    }
    const handleInstructorDetailsError = (error) => {
        console.log(error?.response)
    }

    const handleUpdateDetails = (e) => {
        e.preventDefault();
        const instructorDetails= {
            instructorContact:Contact,
            instructorAddress:Address
        }
        mutate(instructorDetails,{
            onSuccess:handleUpdateDetailsSuccess,
            onError:handleUpdateDetailsError
        })
        //console.log(studentContact,studentAddress);
        setEditProfileState(!editProfileState);
        setDisabledInputState(!disabledInputState);
    }
    const handleUpdateDetailsSuccess = (data) => {
        toast.success("Profile Updated successfully!")
        console.log(data);
    }

    const handleUpdateDetailsError =(error) => {
        console.log(error);
        console.log(error?.response);
    }

    const {data,isLoading,isFetching,isError,error} = useGetInstructorDetails(handleInstructorDetailsSuccess,handleInstructorDetailsError);
    const {mutate,isLoading:updateDetailLoading} = useUpdateInstructorDetails();

    if(isLoading || isFetching || updateDetailLoading) {
        return <div><Loader center size="lg" /></div>
    }

    return (
        <>
            <div className=" font-lato">
            <div className='sticky top-0'>
        <InstructorNavbar />
    </div>
                <div className="bg-gray-100 min-h-screen">
           
                <div className=' pt-5 gap-y-5 gap-x-5 mx-5'>
                    <div className="bg-white  mx-[20vw] shadow-lg rounded-md">
                        <div className='p-5'>
                        <div className='flex flex-row' >
                        <div className='basis-1/5' >
                            <div className = "bg-gray-400 rounded-full w-20 h-20 border-2 flex items-center justify-center shadow-lg">
                                <p className='text-white text-3xl font-bold'>{user?.instructorName?.charAt(0)?.toUpperCase()}</p> {/* place it in center  */}
                                
                                </div>
                                <br></br>
                                <div className=' px-2'>                         
                                <p className='text-lg'>Name: {user?.instructorName}</p>
                                
                                
                            </div>
                        </div>
                        <form onSubmit={handleUpdateDetails} className='basis-4/5'>
                            <div className='flex flex-row justify-between mb-10'>
                                <div className='basis-1/2 px-4'>
                                <label htmlFor="name">Name</label> <br />
                                {disabledInputState ? <input 
                                    type="text" name="name"  placeholder={user?.instructorName}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                            disabled
                                    /> : 
                                    <input 
                                    type="text" name="name"  placeholder={user?.instructorName}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" onChange={e => setName(e.target.value)} />
                                    }
                                </div>
                                <div className='basis-1/2'>
                                    <label htmlFor="contact">Contact</label> <br />
                                    {disabledInputState ? <input 
                                    type="text" name="contact"  placeholder={user?.instructorContact}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                            disabled
                                    /> : 
                                    <input 
                                    type="text" name="contact"  placeholder={user?.instructorContact}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" onChange={e => setContact(e.target.value)} />
                                    }
                                </div>
                            </div>
                            <div className='flex flex-row justify-between mb-10 px-4'>
                                
                                <div className='basis-1/2'>
                                    <label htmlFor="gender">Gender</label> <br />
                                    <input 
                                    type="text" name="gender"  placeholder={user?.instructorGender}
                                    className="text-sm text-gray-base w-v 
                                            py-5 px-4 h-2 mt-2 border 
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
                                    type="text" name="address"  placeholder={user?.instructorAddress}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                            disabled
                                    /> : 
                                    <input 
                                    type="text" name="address"  placeholder={user?.instructorAddress}
                                    className="text-sm text-gray-base w-full 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setAddress(e.target.value)}/>
                                    }
                                </div>
                            </div>
                            {editProfileState ? <div className = "flex flex-row gap-2 pb-5">

                                <div className="basis-1/2 px-3">
                                    <button className="bg-red-600 mt-4 text-white h-10 w-full rounded-md shadow-md" onClick = {handleEditProfileState}>
                                            Cancel
                                    </button>
                                </div>    
                                <div className="basis-1/2 px-3">
                                    <button type="submit" className="hover:bg-[#0f172a] bg-[#0d2660] mt-4 text-white h-10 w-full rounded-md shadow-md">
                                            Update Details
                                    </button>
                                </div>
                            </div> : 
                            <div className="flex flex-row px-3 pb-5">
                                    
                                <button className="hover:bg-[#0f172a] bg-[#0d2660] mt-4 text-white h-10 w-full rounded-md shadow-md" onClick = {handleEditProfileState}>
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

/* 
const [editProfileState,setEditProfileState] = useState(false);
    const [disabledInputState,setDisabledInputState] = useState(true);
    //const [showToast,setShowToast] = useState(false);
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
        toast.success("Profile Updated successfully!")
        console.log(data);
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

    if(isLoading || isFetching || updateDetailLoading) {
        return <div><Loader size="md" /></div>
    }
  return (
    <>
        <div className='grid grid-cols-6 font-lato'>
            <Sidebar active="profile" />    
            <div className='col-span-5'>
                <div className="flex flex-row w-full">
                    <h3 className="text-4xl font-bold">Your Profile</h3>
                </div>
                <div className='grid grid-cols-6 mt-10 gap-y-5 gap-x-5 mx-5'>
                    <div className="col-span-5 mx-10 shadow-lg">
                        <div>
                        <form onSubmit={handleUpdateDetails}>
                            <div className='flex flex-row justify-between mb-10'>
                                <div className='basis-1/2 px-4'>
                                <label htmlFor="name">Name</label> <br />
                                <input 
                                    type="text" name="name" placeholder={user?.studentName}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2 "
                                    disabled/>
                                </div>
                                <div className='basis-1/2'>
                                    <label htmlFor="contact">Contact</label> <br />
                                    {disabledInputState ? <input 
                                    type="text" name="contact"  placeholder={user?.studentContact}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                            disabled
                                    /> : 
                                    <input 
                                    type="text" name="contact"  placeholder={user?.studentContact}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" onChange={e => setStudentContact(e.target.value)} />
                                    }
                                </div>
                            </div>
                            <div className='flex flex-row justify-between mb-10 px-4'>
                                <div className='basis-1/2'>
                                <label htmlFor="age">Age</label> <br />
                                <input 
                                    type="text" name="age"  placeholder={user?.studentAge}
                                    className="text-sm text-gray-base w-96
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                        disabled/>
                                </div>
                                <div className='basis-1/2'>
                                    <label htmlFor="gender">Gender</label> <br />
                                    <input 
                                    type="text" name="gender"  placeholder={user?.gender}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
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
                                    <button className="bg-red-600 mt-4 text-white h-10 w-full rounded-md shadow-md" onClick = {handleEditProfileState}>
                                            Cancel
                                    </button>
                                </div>    
                                <div className="basis-1/2 px-3">
                                    <button type="submit" className="bg-indigo-600 mt-4 text-white h-10 w-full rounded-md shadow-md">
                                            Update Details
                                    </button>
                                </div>
                            </div> : 
                            <div className="flex flex-row px-3 pb-5">
                                    
                                <button className="bg-indigo-600 mt-4 text-white h-10 w-full rounded-md shadow-md" onClick = {handleEditProfileState}>
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
    </>
  )
*/

export default AdminProfile