import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";

export const useChangePassword = (onTryEditClose:() => void) => {
    const {user,setToken,setActive} = useUserStore();
    const token = user.token;
    const [formError,setFormError] = useState('');
    const [passwordInputType,setPasswordInputType] = useState<Record<number,"password" | "text">>({1:'password',2:'password',3:'password'});
    const onTogglePassword = (index:number) => {
        setPasswordInputType(prev => ({...prev,[index]:prev[index] === "password" ? "text" : "password"}));
    }
    const {
        register,
        handleSubmit,
        watch,
        formState:{errors}
    } = useForm<{new_password:string,new_password_confimation:string,old_password?:string}>();

    const onSubmit = async () => {
        const oldPassword = watch('old_password');
        const newPassword = watch('new_password');
        const newPasswordConfirmation = watch('new_password_confimation');
        if(newPassword && newPassword !== newPasswordConfirmation) {
            setFormError('Паролі не співпадають!');
            return;
        }
        try{
            const res = await axiosConfig.post(endpoints.changePassword,{user_password:newPassword,old_user_password:oldPassword || ''},{headers:{Authorization:token}});
            setToken(res.data.token);
            setActive();
            onTryEditClose();
            if(getToken()){
                Cookies.set('token',res.data.token);
            }
        }catch(err){
            console.error(err);
        }
    }

    
    return {onSubmit,register,handleSubmit,formError,user,errors,onTogglePassword,passwordInputType,watch}
}
