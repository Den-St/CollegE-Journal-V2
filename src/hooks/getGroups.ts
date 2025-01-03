import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useAdminGroupsStore } from "../store/adminGroupsStore";
import { useUserStore } from "../store/userStore";
import { GroupT } from "../types/group";
import {myGroupBy} from './../helpers/groupBy';

export const useGetAdminGroups = () => {
    // const [groups,setGroups] = useState<GroupT[]>([]);
    const setGroups = useAdminGroupsStore().setGroups;
    const groups = useAdminGroupsStore().groups;
    const [groupesByGrade,setGroupsByGrage] = useState<Record<string,GroupT[]>>();
    const [loading,setLoading] = useState(false);
    const localToken = useUserStore().user.token;
    
    const fetchGroups = async () => {
        if(groups.length) return;
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.getGroups,{headers:{Authorization:localToken}});
            setGroups(res.data as GroupT[]);
            const a = [
                    {
                        group_full_name: "Кн-41",
                        group_id: "6599319d5edfe84f8d1b25ef"
                    }, 
                    {
                        group_full_name: "Кб-11",
                        group_id: "659ad3d4ee990ad4f4b163e2"
                    }                    
                ];
            //@ts-ignore
            setGroupsByGrage(myGroupBy(res.data,({group_full_name}) => group_full_name.split('-')?.[1]?.[0]));
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        //@ts-ignore
        setGroupsByGrage(myGroupBy(groups,({group_full_name}) => group_full_name.split('-')?.[1]?.[0]));
    },[groups]);
    
    useEffect(() => {fetchGroups()},[]);

    return {groups,refetchGroups:fetchGroups,groupsLoading:loading,groupesByGrade};
}