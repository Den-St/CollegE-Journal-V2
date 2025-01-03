import { routes } from './../consts/routes';
import { useNavigate } from 'react-router-dom';
import { setChangeProfileCookie } from './../helpers/setChangeProfileCookie';
import { UserT } from './../types/user';
import { useUserStore } from './../store/userStore';
import { useEffect } from 'react';
import { getToken } from './../helpers/auth';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { endpoints } from '../consts/endpoints';

export const useAuth = () => {
    const [loading,setLoading] = useState(false);
    const signIn = useUserStore().signIn;
    const cookieToken = getToken();
    const localToken = useUserStore().user.token;
    const onUserLoading = useUserStore().startLoading;
    const onStopUserLoading = useUserStore().stopLoading;
    const navigate = useNavigate();

    const auth = async () => {
        if(!cookieToken && !localToken) return;
        onUserLoading();
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.auth,{headers:{Authorization:cookieToken || localToken}});
            const data = res.data.data;
            signIn({...data,token:cookieToken || localToken || '',
                birth_date:data.birth_date ? new Date(data.birth_date * 1000) : null,
                admission_date:data.admission_date ? new Date(data.admission_date * 1000) : null,},);
           
        }catch(err){
            console.error(err);
        }finally{
            onStopUserLoading();
            setLoading(false);
        }
    }

    useEffect(() => {
        auth();
    },[]);

    return {loading};
}