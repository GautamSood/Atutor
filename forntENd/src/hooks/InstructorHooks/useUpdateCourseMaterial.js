import { useMutation,useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const updateCourseMaterial = (courseObj) => {
    const formData = new FormData();
    //console.log(courseObj?.pdfName?.courseMaterial)
    formData.append("pdfName",courseObj?.courseMaterial?.pdfName);
    const options = {
        withCredentials: true,
    };
    
    return axios.post(`http://localhost:8000/instructor/courseMaterial/${courseObj?.courseId}`,formData,options)
}

export const useUpdateCourseMaterial = (handleSuccess,handleError) => {
    const queryClient = useQueryClient();
    return useMutation(updateCourseMaterial,{
        onSuccess:(data) => {
            toast.success("updated course material successfully!");
            queryClient.invalidateQueries("get-course-details");
        },
        onError:(error) => {
            toast.error(error?.response?.data?.message);
        },
    })
}