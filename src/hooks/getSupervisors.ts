import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { SupervisorT } from "../types/supervisor";

export const useGetSupervisors = () => {
    const localToken = useUserStore().user.token;
    const [supervisors,setSupervisors] = useState<SupervisorT[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    
    const fetchSupervisors = async () => {
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.supervisors,{headers:{Authorization:localToken}});
            setSupervisors(res.data.data.supervisors_list);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSupervisors();
    },[]);

    return {supervisors,supervisorsLoading:loading};
}