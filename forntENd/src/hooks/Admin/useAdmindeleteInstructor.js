import { useMutation,useQueryClient } from "react-query";
import axios from "axios";

const admindeleteInstructor = (updateInstructor) => {
    console.log(updateInstructor)
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.patch(`http://localhost:8000/admin/deleteInstructor/${updateInstructor?.id}`,updateInstructor?.details,options)
}

export const useAdmindeleteInstructor = (handleError) => {
    const queryClient = useQueryClient();
    return useMutation(admindeleteInstructor,{
        onSuccess:() => {
            queryClient.invalidateQueries("get-all-instructors");
        },
        onError:handleError
    })
}