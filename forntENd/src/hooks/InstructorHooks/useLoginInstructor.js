import { useMutation } from "react-query";
import axios from "axios";

const loginInstructor = (instructor) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post("http://localhost:8000/instructor/login",instructor,options)
}


export const useLoginInstructor = () => {
    //const queryClient = useQueryClient();
    return useMutation(loginInstructor)
}