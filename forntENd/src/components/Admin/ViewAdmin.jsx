import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import { useGetAllAdmins } from '../../hooks/Admin/useGetAllAdmins'
import Cookies from 'js-cookie'
import { Loader,Panel,ButtonToolbar,IconButton } from 'rsuite';
import { Plus } from '@rsuite/icons';
import { useCreateAdmin } from '../../hooks/Admin/useCreateAdmin'


const ViewAdmin = () => {

    const [allAdmin, setAllAdmin] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        console.log(userDetailsCookie);
        //setUser(userDetailsCookie);
        if(!userDetailsCookie){
            navigate("/Admin");
        }
    }, [navigate])
  
    const handleSuccess = (data) => {

       setAllAdmin(data?.data?.data?.admins);
       
  }
  const AddAdmin = () => {
    navigate("/CreateAdmin");
  }
  

    const {data,isLoading,isError,error} = useGetAllAdmins(handleSuccess);
    

    if(isLoading ){
        return <div><Loader center size="lg" /></div>
      } 
      if(isError){
      return <div> error Occurred </div>
      }   

    
  return (
    <>
        <div className=" font-lato">
        <div className='sticky top-0 ' style={{'zIndex':'22'}}>
            <AdminNavbar />
        </div>
        <div >
        <ButtonToolbar>
        <IconButton className='  ml-5 mt-5 rounded-sm py-2' color="green" appearance="primary" icon={<Plus />} onClick={AddAdmin}>Add Admin</IconButton>
      </ButtonToolbar>
                    <div className=' mt-5  flex flex-wrap'>
                        {allAdmin?.map(admin => (<div key={admin._id} className="bg-white px-3 pb-3">
                            <Panel className='bg-white' bordered header={admin?.adminName} shaded>
                                <div className=''>
                                    <div className=''>
                                         <div className='font-semibold px-3'>Email - <span>{admin?.email}</span></div>
                                    <div className='font-semibold px-3'>Phone number - <span>{admin?.adminContact}</span></div>
                                    <div className='font-semibold px-3'>Address - <span>{admin?.adminAddress}</span></div>
                                    </div>
                                    
                                </div>               
                                    
                            </Panel>
                        </div>))}
                    </div>
        </div>
        </div>
    </>
  )
}

export default ViewAdmin