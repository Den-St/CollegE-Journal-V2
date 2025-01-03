import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { useUserStore } from "../store/userStore";
import { UserProfileT } from "../types/userProfile";

export const useGetUserProfile = () => {
    const [user,setUser] = useState<UserProfileT>();
    const [loading,setLoading] = useState(false);
    const user_id = useParams().id;
    const token = useUserStore().user.token;

    const fetch = async () => {
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.getUser,{user_id},{headers:{Authorization:token}});
            setUser(res.data.data);
            // document.title = `Профіль студента - ${res.data.data.full_name}`;
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch()
    }, [])
    
    return {user,loading,user_id};
}
