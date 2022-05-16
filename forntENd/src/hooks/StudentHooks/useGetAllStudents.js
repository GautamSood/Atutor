import axios from "axios";
import {useQuery} from "react-query";

const getallStudent = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/student/allUsers",options)
}

export const useGetAllStudent = (handleSuccess,handleError) => {
    return useQuery("get-all-student",getallStudent,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}