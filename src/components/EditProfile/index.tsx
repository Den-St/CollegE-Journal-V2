import { Button, Modal, Popover, UploadProps } from "antd";
import Upload from "antd/es/upload/Upload";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore"
import { UploadOutlined } from '@ant-design/icons';
import "./editProfileStyles.scss";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { QuestionMarkSvg } from "../../assets/svgs/questionMarkSvg";
import { PasswordInfo } from "../PasswordInfo";
import { endpoints } from "../../consts/endpoints";
import axiosConfig from "../../axiosConfig";
import { getToken } from "../../helpers/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../consts/routes";
import Cookies from "js-cookie";
import { ToggleHidePasswordEye } from '../../assets/svgs/toogleHidePasswordEye';
import {EyeOutlined} from "@ant-design/icons";
import AntdImgCrop from "antd-img-crop";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { passwordPattern } from "../../helpers/passwordPattern";
import { useNotification } from "../../hooks/notification";

const useEditProfile = () => {
    const {user,setToken,setAvatar,setActive} = useUserStore();
    const token = user.token;
    const [newAvatarUrl,setNewAvatarUrl] = useState('');
    const [formError,setFormError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<{new_password:string,new_password_confimation:string,avatar:File | string}>();
    const onEditClose = () => {
        navigate(routes.myProfile);
    }
    const onChangeToGoogleAvatar = () => {
        setValue('avatar','google');
        
    }
    const {openErrorNotification,openSuccessNotification,contextHolder} = useNotification(
        `Повідомлення про успішну зміну даних`,
        `Ви змінили дані свого акаунту`,
        `Повідомлення про помилку зміни даних`,
        `Помилка зміни даних свого акаунту`);
        
    const onSubmit = async () => {
        const newPassword = watch('new_password');
        const newPasswordConfirmation = watch('new_password_confimation');
        const avatar = watch('avatar');
        if(newPassword && newPassword !== newPasswordConfirmation) {
            setFormError('Паролі не співпадають!');
            return;
        }
        if(!newPassword && !avatar && avatar !== 'google'){
            setFormError('Ви не змінили дані!');
            return;
        }
        try{
            const queries = [];
            if(avatar){
                if(avatar instanceof File){
                    queries.push(async () => {
                        const reader = new FileReader();
                        reader.readAsDataURL(avatar);
                        reader.onload = async (result) => {await axiosConfig.post(endpoints.changeAvatar,{avatar:result.target?.result},{headers:{Authorization:token}});setAvatar(result.target?.result?.toString() || user.avatar);}
                    })
                }else{
                    await axiosConfig.post(endpoints.changeAvatar,{avatar:'google'},{headers:{Authorization:token}});
                    setAvatar('');
                }
            }
            if(newPassword){
                queries.push(async () => {
                    const res = await axiosConfig.post(endpoints.changePassword,{user_password:newPassword},{headers:{Authorization:token}});
                    setToken(res.data.token);
                    setActive();
                    if(getToken()){
                        Cookies.set('token',res.data.token);
                    }
                });
            }
            await Promise.all(queries.map(q => q()));
            openSuccessNotification()
            Cookies.remove('comfirmedPassword');
            onEditClose();
        }catch(err){
            openErrorNotification();
            console.error(err);
        }
    }
    useEffect(() => {
        if(!Cookies.get('comfirmedPassword')){
            navigate(routes.myProfile);
        }
    },[]);
    
    //@ts-ignore
    const beforeUpload = (file) => {
        setValue('avatar',file);
        setNewAvatarUrl(URL.createObjectURL(file));
    };
    return {onEditClose,beforeUpload,onSubmit,register,handleSubmit,
            newAvatarUrl,formError,user,errors,onChangeToGoogleAvatar,
            contextHolder}
}

export const EditProfile = () => {
    const theme = useThemeStore().theme;
    const {onEditClose,onChangeToGoogleAvatar,beforeUpload,onSubmit,register,handleSubmit,newAvatarUrl,formError,user,errors,contextHolder} = useEditProfile();
    const [passwordInputType,setPasswordInputType] = useState<Record<number,"password" | "text">>({1:'password',2:'password'});
    const onTogglePassword = (index:number) => {
        setPasswordInputType(prev => ({...prev,[index]:prev[index] === "password" ? "text" : "password"}));
    }

    return <div className={`editProfileMain_container ${theme}`}>
        {contextHolder}
        {user.is_active && <LinkBack title="Профіль" route={routes.myProfile}/>}
        <h1 className="header" style={{'marginTop':'-20px'}}>Редагування профілю</h1>
        {/* {user.is_active && <h1 className="editProfile_header">Для того щоб активувати особовий запис потрібно змінити пароль.</h1>} */}
        <div className='studentProfileInfo__container editProfileUserInfo'>
            <div className="editProfileChangePhoto_container">
                <img className='studentProfile_img studentProfile_img_edit' src={newAvatarUrl || user.avatar || defaultAvatar}/>
                <AntdImgCrop showReset  resetText="Відмінити зміни" rotationSlider showGrid modalTitle="Обробка фото" modalOk="Підтвердити" modalCancel="Відмінити">
                    <Upload beforeUpload={beforeUpload} accept="image/png, image/jpeg">
                        <Button className="uploadButton" icon={<UploadOutlined />}>Завантажити</Button>
                    </Upload>
                </AntdImgCrop>
                <Button onClick={onChangeToGoogleAvatar} className="uploadButton">Використовувати з Google</Button>
            </div>
            <div className='studentProfileTextInfo__container'>
                <p className='studentProfile__name'>{user.full_name}</p>
                <p className='studentProfile__email'>{user.mailbox_address || `mail@gmail.com`}</p>
                {!!user?.user_group?.group_full_name && <p className='studentProfile__group'>{user?.user_group?.group_full_name}</p>}
                <form onSubmit={handleSubmit(onSubmit)} style={{width:'400px'}} className="editProfile_form" autoComplete={"off"}>
                    <h2 style={{marginBottom:'12px'}} className="editProfile_section_header">Інтереси</h2>
                    <div style={{display:'flex',gap:'20px',width:'100%'}}>
                        <input
                        className="input editProfile_input" placeholder="Введіть інтереси" autoComplete={"off"} />
                    </div>
                    {!!formError && <p className="signIn_errorMessage">{formError}</p>}
                    {!!errors.new_password?.message && <p className="signIn_errorMessage">{errors.new_password?.message}</p>}
                    <input type={'submit'} className="primary_button" value={'Зберегти зміни'}/>
                </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="editProfile_form" autoComplete={"off"}>
                <div className="editProfile_header_container">
                    <h2 className="editProfile_section_header">Змінити пароль </h2>
                    <Popover open={!!errors.new_password?.message} rootClassName="passwordInfo_popover" placement={'top'} content={<PasswordInfo/>}><div style={{width:'20px',height:'20px'}} className={`questionMark_container ${!!errors.new_password?.message ? 'active' : ''}`}><QuestionMarkSvg/></div></Popover>
                </div>
                <div style={{display:'flex',gap:'20px',width:'100%'}}>
                    <input type={passwordInputType[1]} {...register('new_password',{minLength:{value:8,message:'Пароль має бути не меншим за 8 символів!'},maxLength:{value:30,message:'Пароль має бути не більшим за 30 символів!'},pattern:{value:passwordPattern,message:'Пароль некоректний'}})} className="input editProfile_input" placeholder="Введіть новий пароль" autoComplete={"off"} />
                    <span onClick={() => onTogglePassword(1)} className='passwordEye__button'>{passwordInputType[1] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{color:'white',fontSize:'17px'}} />}</span>
                </div>
                <div style={{display:'flex',gap:'20px',width:'100%'}}>
                    <input {...register('new_password_confimation',)} type={passwordInputType[2]} className="input editProfile_input" placeholder="Повторіть новий пароль" autoComplete={"off"}/>
                    <span onClick={() => onTogglePassword(2)} className='passwordEye__button'>{passwordInputType[2] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{color:'white',fontSize:'17px'}} />}</span>
                </div>
            </form>
        </div>
        <div className="editProfile_section">
            
        </div>
    </div>
}