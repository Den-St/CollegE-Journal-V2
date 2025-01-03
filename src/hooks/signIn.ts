import { securityLevels } from './../consts/securityLevels';
import { routes } from './../consts/routes';
import { useNavigate } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { setToken } from './../helpers/auth';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { UserT } from '../types/user';
import Cookies from 'js-cookie';
import { setChangeProfileCookie } from '../helpers/setChangeProfileCookie';

export const useSignIn = () => {
    const [status,setStatus] = useState<number>();
    const [loading,setLoading] = useState(false);
    const [remember,setRemember] = useState(false);
    const signIn = useUserStore().signIn;
    const navigate = useNavigate();
    const auth = async (token:string,active:boolean) => {
        try{
            const res = await axiosConfig.get(endpoints.auth,{headers:{Authorization:token}});
            const data = res.data.data;
            signIn({...data,token:token || '',
                birth_date:data.birth_date ? new Date(data.birth_date * 1000) : null,
                admission_date:data.admission_date ? new Date(data.admission_date * 1000) : null,},);
            if(res.data.data.security_level === securityLevels.admin) {
                navigate(routes.adminPanel + '?section=schedule');
                return;
            }
            // if(res.data.data.is_active){
                navigate(routes.myProfile);
                return;
            // }
        }catch(err){
            console.error(err);
        }
    }
    const onLogin = async (data:{mailbox_address:string,user_password:string}) => {
        setLoading(true);
        try{
            const res = (await axiosConfig.post(endpoints.login,
                {...data,user_password:data.user_password?.trim()}
            ));
            if(res?.data.status === 1){
                if(remember) setToken(res.data.data.token);
                const data = res.data.data;
                signIn({
                    token:data.token,
                    ...data,
                    birth_date:data.birth_date ? new Date(data.birth_date * 1000) : null,
                    admission_date:data.admission_date ? new Date(data.admission_date * 1000) : null
                });
                await auth(data.token,data.active);
            }
            
            // setStatus(res?.data.status);
        }catch(err){
            setStatus(0);
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    return {onLogin,status,loading,setRemember,remember,setStatus};
}