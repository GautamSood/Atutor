import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const deleteCourse = (courseId) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.delete(`http://localhost:8000/admin/deleteCourse/${courseId}`,options)
}

export const useDeleteCourse = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(deleteCourse,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-all-courses");
        },
        onError:handleError
    })
}