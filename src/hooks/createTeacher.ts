import { notification } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { CreateUserT, } from "../types/user";
import { TeacherT } from './getTeachers';
import { useNotification } from './notification';

export const useCreateTeacher = (onAddTeacherLocally:(teacher:TeacherT) => void) => {
    const localToken = useUserStore().user.token;
    const [createUserErrorCode,setCreateUserErrorCode] = useState<number>();
    const [createUserFormErrorMessage,setErrorMessage] = useState('');
    const [createUserLoading,setCreateUserLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<CreateUserT>();
    const {openErrorNotification,openSuccessNotification,contextHolder} = useNotification(
        `Повідомлення про успішне додання викладача`,
        `Ви надали користувачу ${watch("full_name")} доступ до журналу!`,
        `Повідомлення про помилку додання викладача`,
        `Помилка надання користувачу ${watch("full_name")} доступу до журналу!`);
    
    const onCreateUser = async (data:CreateUserT) => {
        if(!data.full_name.includes(' ')){
            setErrorMessage('Некоректно введене ПІБ!')
            return;
        }
        if(data.phone_number?.[0] !== '+'){
            setErrorMessage('Некоректно введений номер студента!')
            return;
        }
        try{
            setCreateUserLoading(true);
            const res = await axiosConfig.post(endpoints.addUser,{...data,user_type:'teacher',full_name:data.full_name.trim(),security_level:4,is_active:false,avatar:''},{headers:{Authorization:localToken}});
            openSuccessNotification();
            setCreateUserErrorCode(undefined);
            onAddTeacherLocally({avatar:'',department:data.department || '',full_name:data.full_name,user_id:''});
            reset();
            setValue('additional_job_title',null);
            setValue('job_title',null);
            setErrorMessage('');
        }catch(err){
            openErrorNotification();
            //@ts-ignore
            const errorStatus = (err as AxiosError).response?.data?.status;
            setCreateUserErrorCode(errorStatus);
            console.error(err as AxiosError);
        }finally{
            setCreateUserLoading(false)
        }
    }   

    return {createUserLoading,onCreateUser,createUserRegister:register,handleSubmit,createUserSetValue:setValue,createUserErrorCode,createUserWatch:watch,createUserFormErrors:errors,createUserFormErrorMessage,contextHolder};
}
