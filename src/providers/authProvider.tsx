import React from "react"
import { useAuth } from "../hooks/auth";

export const AuthProdiver:React.FC<{children:React.ReactNode}> = ({children}) => {
    useAuth();
    
    return <>{children}</>
}