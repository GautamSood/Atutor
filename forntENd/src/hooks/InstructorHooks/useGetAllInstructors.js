import axios from "axios";
import {useQuery} from "react-query";

const getallInstructor = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/instructor/allUsers",options)
}

export const useGetAllInstructor = (handleSuccess,handleError) => {
    return useQuery("get-all-instructor",getallInstructor,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}