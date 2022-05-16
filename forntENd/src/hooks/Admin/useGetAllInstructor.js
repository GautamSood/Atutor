import axios from "axios";
import {useQuery} from "react-query";

const getAllInstructors = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/admin/getInstructors",options)
}

export const useGetAllInstructors = (handleSuccess,handleError) => {
    return useQuery("get-all-instructors",getAllInstructors,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}
