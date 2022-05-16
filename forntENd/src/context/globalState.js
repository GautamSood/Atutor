import { createContext,useReducer } from "react";
import ReducerContext from './ReducerContext';

const initialState={
    currentUser:null,
    userDetails:null,
    userRole:""
}

export const globalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(ReducerContext,initialState)

    const saveUserOnLogin = (user) => {
        dispatch({
            type:"SAVE_USER_LOGIN",
            payload:user
        })
    }

    const saveUserDetails = (user) => {
        dispatch({
            type:"SAVE_USER_LOGIN",
            payload:user
        })
    }

    return (
    <globalContext.Provider value={{ currentUser:state.currentUser,saveUserOnLogin,saveUserDetails }}>
        {children}
    </globalContext.Provider>
    )
}

