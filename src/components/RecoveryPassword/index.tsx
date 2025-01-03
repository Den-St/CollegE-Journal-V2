import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { ToggleHidePasswordEye } from "../../assets/svgs/toogleHidePasswordEye";
import axiosConfig from "../../axiosConfig";
import { endpoints } from "../../consts/endpoints";
import {EyeOutlined} from "@ant-design/icons";
import { Loader } from "../Loader/Loader";
import { Popover, Spin } from "antd";
import axios from "axios";
import { routes } from "../../consts/routes";
import { PasswordInfo } from "../PasswordInfo";
import { QuestionMarkSvg } from "../../assets/svgs/questionMarkSvg";

const useRecoveryPassword = () => {
    const [email,setEmail] = useState();
    const [formError,setFormError] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<{user_password:string,confirmation_user_password:string}>();
    const recovery_token = useSearchParams()[0].get('recovery_token');
    const navigate = useNavigate();

    const checkToken = async () => {
        if(!recovery_token) {
            navigate('/');
            return;
        }
        try{
            const res = await axiosConfig.post(endpoints.checkRecoveryToken,{recovery_token});
            setEmail(res.data.data.mailbox_address);
        }catch(err){

            if(axios.isAxiosError(err)){
                console.error(err?.response?.data);
                if(err?.response?.data.status === 0) {
                    navigate('/');
                    return; 
                }
            }
        }
    }

    const onSubmit = async (data:{user_password:string,confirmation_user_password:string}) => {
        if(data.user_password !== data.confirmation_user_password) {
            setFormError('Паролі не співпадають')
            return;
        };
        setFormError('');
        try{
            const res = await axiosConfig.post(endpoints.recoveryPassword,{recovery_token,user_password:data.user_password});
            navigate(routes.signIn);
        }catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        checkToken();
    },[recovery_token]);

    return {register,handleSubmit,errors,onSubmit,email,formError};
}
export const RecoveryPassword = () => {
    const {register,handleSubmit,errors,onSubmit,email,formError} = useRecoveryPassword();
    const [passwordInputType,setPasswordInputType] = useState<Record<number,"password" | "text">>({1:'password',2:'password'});
    const onTogglePassword = (index:number) => {
        setPasswordInputType(prev => ({...prev,[index]:prev[index] === "password" ? "text" : "password"}));
    }
    
    return <div style={{'display':'flex',gap:'50px',flexDirection:'column',padding:'170px 12% 0 12%'}}>
        <h1 className="header">Сторінка зміни паролю</h1>
        <h1 className="header" style={{marginBottom:'-10px'}}>{email || <Spin/>}</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{'display':'flex',gap:'20px',flexDirection:'column',width:'50%'}}>
            <div style={{display:'flex',gap:'30px','alignItems':'center'}}>
                <h1 className="subSubHeader">
                    Змінити пароль
                </h1>
                <Popover open={!!errors.user_password?.message } rootClassName="passwordInfo_popover" placement={'top'} content={<PasswordInfo/>}><div style={{width:'20px',height:'20px'}} className={`questionMark_container ${!!errors.user_password?.message ? 'active' : ''}`}><QuestionMarkSvg/></div></Popover>
            </div>
            <div style={{display:'flex',gap:'20px'}}>
                <input
                    style={{'width':'100%'}}
                    {...register('user_password',{minLength:{value:8,message:'Пароль має бути не меншим за 8 символів!'},maxLength:{value:30,message:'Пароль має бути не більшим за 30 символів!'},pattern:{value:/^(?=.*[0-9])(?=.*[!@#$%^&*+-/_])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*+-/_]{8,30}$/,message:'Пароль некоректний'},required:{value:true,message:'Введіть новий пароль'}})}
                    className="input" placeholder="Введіть новий пароль"
                    type={passwordInputType[1]}
                    />
                    <span onClick={() => onTogglePassword(1)} className='passwordEye__button'>{passwordInputType[1] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{color:'white',fontSize:'17px'}} />}</span>
            </div>
            <div style={{display:'flex',gap:'20px'}}>
                <input
                    style={{'width':'100%'}}
                    {...register('confirmation_user_password',{required:{value:true,message:'Повторіть новий пароль'}})}
                    className="input" placeholder="Повторіть новий пароль"
                    type={passwordInputType[2]}
                    />
                    <span onClick={() => onTogglePassword(2)} className='passwordEye__button'>{passwordInputType[2] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{color:'white',fontSize:'17px'}} />}</span>
            </div>
            {!!formError && <p className="signIn_errorMessage">{formError}</p>}
            {!!errors.user_password?.message && <p className="signIn_errorMessage">{errors.user_password?.message}</p>}
            {!!errors.confirmation_user_password?.message && <p className="signIn_errorMessage">{errors.confirmation_user_password?.message}</p>}
            <input className="primary_button" type={'submit'} value={'Змінити'}/>
        </form>
    </div>
}