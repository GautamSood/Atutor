import { useMutation,useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const deleteCourseMaterial = (courseIdObj) => {
    console.log(courseIdObj?.courseId)
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.delete(`http://localhost:8000/instructor/courseMaterial/${courseIdObj?.materialId}/${courseIdObj?.courseId}`,options)
}

export const useDeleteCourseMaterial = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(deleteCourseMaterial,{
        onSuccess:() => {
            toast.success("course material deleted!")
            queryClient.invalidateQueries("get-course-details");
        },
        onError:handleError
    })
}