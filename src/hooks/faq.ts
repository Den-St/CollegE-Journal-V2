import { endpoints } from './../consts/endpoints';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from '../store/userStore';
import { FaqType } from '../types/faq';

export const useFaq = () => {
    const [faqItems,setFaqItems] = useState<FaqType[]>([]);
    const [loading,setLoading] = useState(false);
    const localToken = useUserStore().user.token;

    const fetchFaq = async () => {
        try{
            setLoading(true);
            const res = await (await axiosConfig.get(endpoints.faq,{headers:{Authorization:localToken}})).data as {questions:FaqType[]};
            setFaqItems(res.questions);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchFaq();
    },[]);

    return {faqItems,loading};
}