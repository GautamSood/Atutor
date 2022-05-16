import { useMutation } from "react-query";
import axios from "axios";

const createAdmin = (admin) => {
    const options = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    return axios.post("http://localhost:8000/admin/createAdmin",admin,options)
}


export const useCreateAdmin = () => {
    //const queryClient = useQueryClient();
    return useMutation(createAdmin)
}