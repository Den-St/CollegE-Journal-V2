import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosConfig from "../../axiosConfig";
import { emailPattern } from "../../consts/emailPattern";
import { endpoints } from "../../consts/endpoints";
import { useNotification } from "../../hooks/notification";
import "./styles.scss";

const errorCodesToMessages:Record<string,string> = {
    // 'User not found.':'Користувача з таким email не знайдено',
    'User mail isn\'t valid.':'Email не коректний'
}
const useForgotPassword = (onClose:() => void) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{errors}
    } = useForm<{mailbox_address:string}>();
    const [formError,setFormError] = useState('');
    const [submitBlocked,setSubmitBlocked] = useState(false);
    
    const {openErrorNotification,openSuccessNotification,contextHolder} = useNotification(
        `Запит на зміну пароля було відправлено`,
        ``,
        `Запит на зміну пароля не було відправлено`,
        ``);

    const onSubmit = async (data:{mailbox_address:string}) => {
        setSubmitBlocked(true);
        try{
            const res = await axiosConfig.post(endpoints.sendRecovery,data);
            openSuccessNotification();
            onClose();
        }catch(err){
            openErrorNotification();
            if(axios.isAxiosError(err)){
                err?.response?.data.error !== 'User not found.' && setFormError(err?.response?.data.error);
            }
        }finally{
            setSubmitBlocked(false);
        }
    }

    return {register,handleSubmit,errors,onSubmit,formError,submitBlocked,contextHolder}
}

export const ForgotPasswordModal:React.FC<{onClose:() => void}> = ({onClose}) => {
    const {handleSubmit,register,errors,onSubmit,formError,submitBlocked,contextHolder} = useForgotPassword(onClose);
    
    return <div className="forgotPassword_container">
        {contextHolder}
        <form onSubmit={handleSubmit(onSubmit)} className="forgotPassword_form">
            <h1 className="header">Забули пароль?</h1>
            <div className="forgotPassword_input_container">
                <h2 className="forgotPassword_subheader">Введіть свою пошту, яка прив’язана до акаунту</h2>
                <input {...register('mailbox_address',{pattern:{value:emailPattern,message:'На жаль дані введені не коректно або ця пошта не прив’язана до журналу, перевірте їх та спробуйте ще раз!'},required:{value:true,message:'Введіть поштову адресу!'}})} className="input" placeholder="Введіть свою пошту"/>
            </div>
            {!!errors.mailbox_address?.message && <p className='signIn_errorMessage'>{errors.mailbox_address?.message}</p>}
            {formError && <p className='signIn_errorMessage'>{errorCodesToMessages[formError]}</p>}
            <p className="forgotPassword_description">
                На введену пошту прийде автоматичний лист із запитом на зміну паролю. Також, поки ви не змінете пароль за надісланим запитом, акаунт буде недійсний
            </p>
            <input type={'submit'} disabled={submitBlocked} style={{width:'270px',height:'40px'}} className="primary_button" value={"Підтвердити запит"}/>
        </form>
    </div>
}