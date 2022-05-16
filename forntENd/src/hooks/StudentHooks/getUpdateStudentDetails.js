import { useMutation } from "react-query";
import axios from "axios";

const enrollCourse = (studentDetails) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/student/updateDetails`,studentDetails,options)
}

export const useUpdateStudentDetails = (handleSuccess,handleError) => {
    return useMutation(enrollCourse,{
        onSuccess:handleSuccess,
        onError:handleError
    })
}