import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const adminUpdateInstructor = (updateInstructor) => {
    console.log(updateInstructor)
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/admin/updateInstructor/${updateInstructor?.id}`,updateInstructor?.details,options)
}

export const useAdminUpdateInstructor = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(adminUpdateInstructor,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-all-instructors");
        },
        onError:handleError
    })
}