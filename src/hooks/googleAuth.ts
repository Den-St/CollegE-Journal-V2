import { useState } from 'react';
import { setToken } from './../helpers/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { endpoints } from './../consts/endpoints';
import axiosConfig from '../axiosConfig';
import { useUserStore } from '../store/userStore';
import { setChangeProfileCookie } from '../helpers/setChangeProfileCookie';
import { routes } from '../consts/routes';
import { UserT } from '../types/user';
import { originUrl } from '../consts/originUrl';
import { securityLevels } from '../consts/securityLevels';

export const useGoogleAuthRequest = (setErrorStatus:(statusNumber:number) => void,rememberMe?:boolean,) => {
    const signIn = useUserStore().signIn;
    const onUserLoading = useUserStore().startLoading;
    const onStopUserLoading = useUserStore().stopLoading;
    const navigate = useNavigate();
    const [googleAuthLoading,setLoading] = useState(false);

    const auth = async (token:string) => {
        if(!token) return;
        onUserLoading();
        try{
            const res = await axiosConfig.get(endpoints.auth,{headers:{Authorization:token}});
            const data = res.data.data;
            signIn({...data,token:token || '',
            birth_date:data.birth_date ? new Date(data.birth_date * 1000) : null,
            admission_date:data.admission_date ? new Date(data.admission_date * 1000) : null,});
            if(res.data.data.security_level === securityLevels.admin) {
                navigate(routes.adminPanel + '?section=schedule');
                return;
            }
            // if(res.data.data.is_active){
                navigate(routes.myProfile);
                return;
            // }
            // if(!res.data.data.is_active) {
            //     setChangeProfileCookie();
            //     navigate(routes.editProfile);
            // }
        }catch(err){
            console.error(err);
        }finally{
            onStopUserLoading();
        }
    }
    const onOpenAuthWindow = async () => {
        try{
            const res = await axiosConfig.get(endpoints.googleAuthGetUrl);
            const popup = window.open(res.data.redirect_url,'googleAuthPopup','width=600,height=400,left=200,top=200',);
            if(!popup) return;
            window.addEventListener('message', async function(event) {
                if (event.data.message !== 'success_close') {
                    return;
                }
                setLoading(true);
                const {state,code,scope,authuser,prompt} = event.data;
                try{
                    const res = await axiosConfig.get(endpoints.googleLogin+`?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`);
                    if(rememberMe) setToken(res.data.data.token);
                    await auth(res.data.data.token);
                }catch(err){
                    setErrorStatus(0);
                    console.error(err);
                }finally{
                    setLoading(false);
                }
            }, false);
        }catch(err){
            console.error(err);
        }
    }

    return {onOpenAuthWindow,googleAuthLoading};
}

export const useGoogleAuthLogin = () => {
    const [searchParams,_] = useSearchParams();
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const scope = searchParams.get('scope');
    const authuser = searchParams.get('authuser');
    const prompt = searchParams.get('prompt');

    const onGoogleLogin =  async () => {
        window.opener.postMessage({message:'success_close',state,code,scope,authuser,prompt},originUrl);
        window.close();
    }

    useEffect(() => {
        if(!state || !code || !scope || authuser === null || !prompt) return;
        onGoogleLogin();
    },[state,code,scope,authuser,prompt])
}