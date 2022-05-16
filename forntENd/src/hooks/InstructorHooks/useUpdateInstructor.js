import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const updateInstructorDetails = (instructorDetails) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/instructor/updateDetails`,instructorDetails,options)
}

export const useUpdateInstructorDetails = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(updateInstructorDetails,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-instructor-details");
        },
        onError:handleError
    })
}