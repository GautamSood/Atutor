import axios from "axios";
import {useQuery} from "react-query";

const getAssignedCourses = () => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.get("http://localhost:8000/instructor/coursesAssigned",options)
}

export const useGetAssignedCourses = (handleSuccess,handleError) => {
    return useQuery("get-assigned-courses",getAssignedCourses,{
        onSuccess:handleSuccess,
        onError:handleError,
    })
}