import { GoogleIconSvg } from '../../assets/svgs/googleIconSvg';
import { ToggleHidePasswordEye } from '../../assets/svgs/toogleHidePasswordEye';
import {EyeOutlined} from "@ant-design/icons";
import './loginStyles.scss';
import { Modal} from 'antd';
import { useThemeStore } from '../../store/themeStore';
import { useEffect, useState } from 'react';
import { useSignIn } from '../../hooks/signIn';
import { useForm } from 'react-hook-form';
import {  useSearchParams } from 'react-router-dom';
import { emailPattern } from '../../consts/emailPattern';
import { ForgotPasswordModal } from '../ForgotPasswordModal';
import { useGoogleAuthRequest } from '../../hooks/googleAuth';
import { Loader } from '../Loader/Loader';
import { useAutoLoginFromMail } from '../../hooks/autoLoginFromMail';

const statusCodes:Record<number,string> = {
    0:'На жаль, дані введені некоректно, перевірте їх та спробуйте ще раз!',
}

export const SignIn = () => {
    const theme = useThemeStore().theme;
    useEffect(() => {
        document.title = "Вхід до акаунту";
    },[]);
    const [passwordInputType,setPasswordInputType] = useState<"password" | "text">("password");
    const onTogglePassword = () => {
        setPasswordInputType(prev => prev === "password" ? "text" : "password");
    }
    const {onLogin,status,loading,setRemember,remember,setStatus} = useSignIn();
    const {onOpenAuthWindow,googleAuthLoading} = useGoogleAuthRequest(setStatus,remember,);
    const [onForgotPasswordModal,setOnForgotPasswordModal] = useState(false);
    const {autoLoginMailData} = useAutoLoginFromMail(onLogin);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{errors}
    } = useForm<{mailbox_address:string,user_password:string}>();

    // if(status === 1) return <Navigate to={routes.myProfile}/>
    
    return <div className={`signIn__container ${theme}`}>
        {/* {googleAuthLoading && <div className='googleAuthLoader_container'><Loader/></div>} */}
        <div className='signIn__wrapper'>
            <h1 className="signIn__header">Вхід</h1>
            <form onSubmit={handleSubmit(onLogin)} className="signIn__form">
                <div className="signInInput__container">
                    <input {...register('mailbox_address',{pattern:{value:emailPattern,message:'Некоректний email!'}})} defaultValue={autoLoginMailData.mailbox_address || ''} type={'email'}  placeholder={"Username@gmail.com"} className={'email__input'}/>
                </div>
                <div className="signInInput__container">
                    <input {...register('user_password')} type={passwordInputType} defaultValue={autoLoginMailData.user_password || ''} placeholder={"Password"} className={'password__input'} autoComplete={"off"}/>
                    <span onClick={onTogglePassword} className='passwordEye__button'>{passwordInputType === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{fontSize:'17px'}} />}</span>
                </div>
                <div className="signInSettings__container">
                    <div className="rememberMe__container">
                        <input autoComplete="off"  type='checkbox' onChange={(e) => setRemember(e.target.checked)} className="rememberMe__checkbox"/>
                        <p className="rememberMe__title">Запам'ятати мене</p>
                    </div>
                    <span onClick={() => setOnForgotPasswordModal(true)} className="forgotPassword textButton">Забули пароль?</span>
                </div>
                {status !== undefined && <p style={{marginTop:'-30px',marginBottom:'-20px'}} className='signIn_errorMessage'>{statusCodes[status]}</p>}
                {!!errors.mailbox_address?.message && <p style={{marginTop:'-30px',marginBottom:'-20px'}} className='signIn_errorMessage'>{errors.mailbox_address?.message}</p>}
                <input autoComplete="off"  disabled={loading} type={'submit'} className="signIn__button" value={'Увійти'}/>
            </form>
            <button onClick={onOpenAuthWindow} className='signInWithGoogle__button'>
                {googleAuthLoading ? <Loader/> :
                <>
                    <span className='signInWithGoogle__icon'>
                        <GoogleIconSvg/>
                    </span>
                    <span className='signInWithGoogle__title'>
                        Увійти через Google
                    </span>
                </>}
            </button>
            <div className='noAccount__container'>
                <span className='noAccount__text'>Досі немає облікового запису?</span>
                <span className='noAccount__text'>Будь ласка, отримайте дані входу у куратора, для підтвердження облікового запису.</span>
            </div>
        </div>
        <Modal centered open={onForgotPasswordModal} footer={false} onCancel={() => setOnForgotPasswordModal(false)} rootClassName="forgotPassword_modal" >
            <ForgotPasswordModal onClose={() => setOnForgotPasswordModal(false)}/>
        </Modal>
    </div>
}