import { GroupT } from './../types/group';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { CreateUserT, UserT } from "../types/user";
import { useGetAdminGroups } from "./getGroups";
import { useNotification } from './notification';

export const useCreateUser = (group?:GroupT) => {
    // const {groups} = useGetGroups();
    const groupId = useParams().id;
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
        `Повідомлення про успішне додання користувача`,
        `Ви надали користувачу ${watch("full_name")} доступ до журналу ${group?.group_full_name}!`,
        `Повідомлення про помилку додання користувача`,
        `Помилка надання користувачу ${watch("full_name")} доступу до журналу ${group?.group_full_name}!`);
        
    const onCreateUser = async (data:CreateUserT) => {
        if(!data.education_form) {
            setErrorMessage('Оберіть форму навчання!')
            return;
        }
        if(!data.education_type){
            setErrorMessage('Оберіть тип навчання!')
            return;
        }
        if(!data.full_name.includes(' ')){
            setErrorMessage('Некоректне ПІБ!')
            return;
        }
       
        // if(data.phone_number?.[0] !== '+'){
        //     setErrorMessage('Некоректно введений номер студента!')
        //     return;
        // }
        // if(data.parents_phone_number?.[0] !== '+'){
        //     setErrorMessage('Некоректно введений номер батьків!')
        //     return;
        // }
        if(!data.phone_number?.includes('+')){
            setErrorMessage('Некоректно введений номер студента!')
            return;
        }
        // if(!data.parents_phone_number?.includes('+')){
        //     setErrorMessage('Некоректно введений номер батьків!')
        //     return;
        // }
        try{
            setCreateUserLoading(true);
            const admission_date = !!data.admission_date?.getTime ? Math.round((data.admission_date?.getTime() || 0)/1000) : null;
            const birth_date = !!data.birth_date?.getTime ? Math.round((data.birth_date?.getTime() || 0)/1000) : null;
            const res = await axiosConfig.post(endpoints.addUser,{...data,birth_date,admission_date,user_type:'student',group_id:groupId,full_name:data.full_name.trim(),security_level:1,is_active:false,avatar:'',is_on_scholarships:data.is_on_scholarships === 'Так'},{headers:{Authorization:localToken}});
            openSuccessNotification()
            group?.group_students?.push({full_name:data.full_name,avatar:'',mailbox_address:data.mailbox_address,student_id:res.data?.user_id});
            setCreateUserErrorCode(undefined);
            reset();
            setValue('education_form',null);
            setValue('education_type',null);
            setValue('location',null);
            setValue('is_on_scholarships',null);
            setValue('additional_job_title',null);
            setErrorMessage('');
        }catch(err){
            openErrorNotification()
            //@ts-ignore
            const errorStatus = (err as AxiosError).response?.data?.internal_error_code;
            setCreateUserErrorCode(errorStatus);
            console.error(err as AxiosError);
        }finally{
            setCreateUserLoading(false)
        }
    }   

    return {createUserLoading,onCreateUser,createUserRegister:register,handleSubmit,
            createUserSetValue:setValue,createUserErrorCode,createUserWatch:watch,
            createUserFormErrors:errors,createUserFormErrorMessage,watch,register,setValue,
            contextHolder};
}
