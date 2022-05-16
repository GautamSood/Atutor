import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { Loader, Modal, Panel } from 'rsuite';
import AdminNavbar from '../../AdminNavbar';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import { useAdmindeleteInstructor } from '../../../../hooks/Admin/useAdmindeleteInstructor';
import { useGetAllInstructors } from '../../../../hooks/Admin/useGetAllInstructor';
import { useAdminUpdateInstructor } from '../../../../hooks/Admin/useAdminUpdateInstructor';
import { toast } from 'react-toastify';


const AdminManageInstructor = () => {
    const [userList,setUserList] = useState("");
    const [showAlertDialog,setShowAlertDialog] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [modalData,setModalData] = useState();
    const [email, setemail] = useState("invalid")
    const [name,setName] = useState("");
    const [contact,setContact] = useState("");
    const [address,setAddress] = useState("");
    const [instructorId,setInstructorId] = useState();
    const navigate = useNavigate();

    const Name ="invalid"
    
    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/Admin");
        }
    }, [navigate])

    const handleGetInstructorsSuccess = data => {
        //console.log(data?.data?.data?.students)
        setUserList(data?.data?.data?.instructors);
    }
    const handleGetInstructorsError = error => {
        console.log(error?.response);
    }


    const handleDeleteInstructorError = error => {
        console.log(error?.response)
    }

    const handleUpdateSuccess = () => {
        setShowModal(false);
        toast.success("Profile Updated Successfully")
        
    }

    const handleUpdateError = () => {
        toast.error("An error occured")
        showModal(false);
    }

    const handleUpdateInstructorDetails = e => {
        e.preventDefault();
        const updatedDetails = {
            id:instructorId,
            details:{
                instructorName:name,
                instructorContact:contact,
                instructorAddress:address,
            }
        }
        updateInstructor(updatedDetails,{
            onSuccess:handleUpdateSuccess,
            onError:handleUpdateError
        });
        setShowModal(false);
    }

    const handleDeleteInstructor = () => {
        const updatedDetails = {
            id:instructorId,
            details:{
                email: email,
                instructorName: Name
            }
        }
        deleteInstructor(updatedDetails,{
            onSuccess:handleUpdateSuccess,
            onError:handleUpdateError
        });
        setShowModal(false);
    }

    const {data:allInstructors,isLoading,isFetching} = useGetAllInstructors(handleGetInstructorsSuccess,handleGetInstructorsError);
    const {mutate:deleteInstructor,isLoading:deleteStudentLoading} = useAdmindeleteInstructor(handleDeleteInstructorError);
    const {mutate:updateInstructor,isLoading:Loading} = useAdminUpdateInstructor();
    
    const viewModal = instructor => {
        setModalData(instructor);
        setInstructorId(instructor?._id);
        setName(instructor?.instructorName);
        setContact(instructor?.instructorContact);
        setAddress(instructor?.instructorAddress)
        setShowModal(true);
    }

    const deleteModel = instructor => {
        setInstructorId(instructor?._id);
        setShowAlertDialog(true)
    }

    if( isLoading || isFetching || Loading){
        return <div><Loader size="md" /></div>
    }

    return (
        <>
            <div className=" font-lato">
            <div className='sticky top-0'>
            <AdminNavbar />
        </div>
                <div className="">
                    <div className="flex flex-row w-full">
                        <h3 className="text-4xl font-bold"> Manage Instructor</h3>
                    </div>
                    <div className="col-span-5 mx-20 py-4">

                        {userList?.map(user => (
                        <div className='col-span-4 rounded-md shadow-lg mb-4 border-2' key={user?._id}>
                            <div className="grid grid-cols-6">
                                <div className="flex col-span-1 p-2">
                                    <div className = "bg-gray-400 rounded-full w-20 h-20 border-2 flex items-center justify-center shadow-lg">
                                        <p className='text-white text-3xl font-bold'>{user?.instructorName?.charAt(0)?.toUpperCase()}</p> {/* place it in center  */}
                                    </div>
                                </div>
                                <div className="flex col-span-3 ">
                                    <h3 className="text-xl font-bold mt-4">{user?.instructorName}</h3>
                                </div>
                                <div className='flex col-span-2 justify-end p-2'>
                                    <div className="flex justify-end ">
                                        <div>
                                            {/* <a href={`/admin/manageStudents/${user?._id}`}>
                                                <button className=' bg-indigo-600 text-white px-3 py-3 rounded-md shadow-md m-1'>Edit Details</button>
                                            </a> */}
                                            <button className=' bg-[#11244e] hover:bg-[#060f24] text-white px-3 py-3 rounded-md shadow-md m-1'onClick={() =>viewModal(user)}>Edit Details</button>
                                            <button className=' bg-red-600 text-white px-3 py-3 rounded-md shadow-md m-1' onClick={()=>deleteModel(user)}>Delete</button> 

                                            {showAlertDialog===true && 
                                            <>
                                                <Modal backdrop="static" role="alertdialog" open={showAlertDialog} onClose={() =>setShowAlertDialog(false)} size="xs">
                                                <Modal.Body>
                                                
                                                <RemindFillIcon style={{color:"red"}} /> <span className='font-bold'>All information related to student would be deleted forever. Are you sure you want to proceed ?</span>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <button  className="bg-red-600 text-white px-3 py-2 rounded-md shadow-md m-1" onClick={handleDeleteInstructor}>
                                                    Ok
                                                </button>                                                
                                                <button onClick={() => setShowAlertDialog(false)} className="bg-gray-600 text-white px-3 py-2 rounded-md shadow-md m-1">
                                                    Cancel
                                                </button>
                                                </Modal.Footer>
                                            </Modal>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row ">
                                <div className="basis-2/3 ">
                                    <Panel>
                                        <div className='font-semibold p-2'>Email - <span>{user?.email}</span></div> 
                                        <div className='font-semibold p-2'>Address - <span>{user?.instructorAddress}</span></div>
                                        <div className='font-semibold p-2'>Contact - <span>{user?.instructorContact}</span></div>                                        
                                    </Panel>
                                </div>                                  
                            </div>
                        </div>))}
                        <Modal open={showModal} backdrop="static" keyboard={false} onClose={() => setShowModal(false)}>
                            <Modal.Header>{modalData?.instructorName}</Modal.Header>
                            <Modal.Body>
                            <form onSubmit={handleUpdateInstructorDetails}>
                          <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                <label htmlFor="name">Name</label> <br />
                                <input 
                                    type="text" name="name"  
                                    placeholder={modalData?.instructorName}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setName(e.target.value)} />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="contact">Contact</label> <br />
                                    <input 
                                    type="text" name="contact"  
                                    placeholder={modalData?.instructorContact}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setContact(e.target.value)} 
                                    minLength={10} maxLength={10}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row justify-between mb-5'>
                                <div className='basis-1/3 px-4'>
                                    <label htmlFor="studentAddress">Address</label> <br />
                                    <input 
                                    type="text" name="studentAddress"  
                                    placeholder={modalData?.instructorAddress}
                                    className="text-sm text-gray-base w-96 
                                            py-5 px-4 h-2 mt-2 border 
                                            border-gray-200 rounded mb-2" 
                                    onChange={e => setAddress(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row px-3'>
                              <div className="basis-1/2">
                                <button type="submit" className="bg-indigo-600 mt-4 w-full text-white h-10 rounded-md shadow-md">
                                  Update Details
                                </button>
                              </div>
                            </div>
                        </form>
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </div>    
        </>
    )
}

export default AdminManageInstructor