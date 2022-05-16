import React,{useState,useEffect} from 'react'
import AdminNavbar from './AdminNavbar'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useCreateAdmin } from '../../hooks/Admin/useCreateAdmin'
import {toast} from "react-toastify";

const CreateAdmin = () => {
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password,setPassword ] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [Contact, setContact] = useState("")
    const [Address, setAddress] = useState("")
    const navigate = useNavigate();
    const {mutate,error,isLoading} = useCreateAdmin();

    useEffect(() => {
        const userDetailsCookie = Cookies.get("userDetailsCookie");
        if(!userDetailsCookie){
            navigate("/Admin");
        }
    }, [navigate])

    const handleError = (err) => {
        toast.error("admin is not added")
      }
    
      const handleSuccess = (data) => {
        toast.success("new admin added")
      }

    const handlesubmit = (e)=>{
        e.preventDefault();
        const AdminDetailsObj = {
          adminName:Name,
          email:Email,
          adminPassword:Password,
          passwordConfirm:ConfirmPassword,
          adminContact:Contact,
          adminAddress:Address  
        }
        mutate(AdminDetailsObj,{
          onSuccess:handleSuccess,
          onError:handleError
        });

    }

  return (
    <>
        <div className='sticky top-0'>
            <AdminNavbar />
        </div>
        <div className='mx-[25vw] shadow-md p-5 my-12'>
        <form  className="mb-0 space-y-06 " onSubmit={handlesubmit}  >               


        <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Name*</label>
                <div className="mt-1">
                    <input id="name" name="name" type="text"  required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='name' value={Name}  onChange={e => setName(e.target.value)} />
                </div>
         </div>
         <br></br>
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email address*</label>
                <div className="mt-1">
                    <input id="email" name="email" type="email"  required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='email' value={Email}  onChange={e => setEmail(e.target.value)}/>
                </div>
                </div>
                <br></br>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password*</label>
                    <div className="mt-1">
                    <input id="password" name="password" type="password" autoComplete="password" required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='password' value={Password}  onChange={e => setPassword(e.target.value)}  />
                    </div>
                </div> 
                <br></br> 
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700"> Confirm Password*</label>
                    <div className="mt-1">
                    <input id="confirm-password" name="confirm-password" type="password" autoComplete="password" required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='confirm-password' value={ConfirmPassword}  onChange={e => setConfirmPassword(e.target.value)}  />
                    </div>
                </div>
                <br></br> 
                <div>
                    <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700"> Contact-Number*</label>
                    <div className="mt-1">
                    <input id="contact-number" name="contact-number" type="number" required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='contact-number' value={Contact}  onChange={e => setContact(e.target.value)}  />
                    </div>
                </div> 
                <br></br> 
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700"> Address*</label>
                    <div className="mt-1">
                    <input id="address" name="address" type="text"  required className="w-full border border-gray-100 px-2  py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='address'  value={Address}  onChange={e => setAddress(e.target.value)} />
                    </div>
                </div>   
                <br></br>

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0f172a] hover:bg-[#0d2660] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">submit</button>
                </div>
                <br></br>
                </form>
        </div>
    </>
  )
}

export default CreateAdmin