import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const createCourse = (course) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post("http://localhost:8000/instructor/createCourse",course,options)
}


export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation(createCourse,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-assigned-courses")
        }
    })
}