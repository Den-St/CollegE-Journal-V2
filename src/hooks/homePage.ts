import { endpoints } from './../consts/endpoints';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { HomePageDataT } from "../types/homePageData";

const fetchHomePageData = async (token:string) =>{
    return await axiosConfig.get(endpoints.mainPage,{headers:{Authorization:token}}).then(res => res.data);
}

export const useHomePage = () => {
    const [homePageData,setHomePageData] = useState<HomePageDataT>();
    const [loading,setLoading] = useState(false);
    const localToken = useUserStore().user.token;

    const fetchData = async () => {
        setLoading(true);
        try{
            const res = await fetchHomePageData(localToken) as HomePageDataT;
            setHomePageData(res);
        }catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        document.title = "Електронний Журнал";
    },[]);
    
    useEffect(() => {
        fetchData();
    },[]); 

    return {loading,homePageData};
}