import {useQuery} from "react-query";
import { useMutation,useQueryClient } from "react-query";
import axios from "axios";
const signUpInstructor = (instructor) => {
    return axios.post("http://localhost:8000/instructor/signUp",instructor)
}
export const useSignUpInstructor = () => {
    return useMutation(signUpInstructor)
}