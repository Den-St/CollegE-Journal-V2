import { securityLevels } from './../consts/securityLevels';
import { JournalGroupT } from './../types/journalGroup';
import { useEffect } from 'react';
import { endpoints } from './../consts/endpoints';
import { useUserStore } from './../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { useTeachersGroupsStore } from '../store/teachersGroupsStore';
import {myGroupBy} from './../helpers/groupBy';

export const useGroupsByTeacher = () => {
    const [loading,setLoading] = useState(false);
    // const [groups,setGroups] = useState<GroupT[]>([]);
    const groups = useTeachersGroupsStore().groups;
    const setGroups = useTeachersGroupsStore().setGroups;

    const security_level = useUserStore().user.security_level;
    const localToken = useUserStore().user.token;
    const [groupesByGrade,setGroupsByGrade] = useState<Record<string,JournalGroupT[]>>();

    const fetch = async () => {
        if(groups.length) return;
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.userGroups,{headers:{Authorization:localToken}});
            setGroups(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(!localToken || !security_level || security_level < securityLevels.teacher) return;
        fetch();
    },[security_level,localToken]);
    
    useEffect(() => {
        if(!groups.length) return;
        //@ts-ignore
        setGroupsByGrade(myGroupBy(groups,({journal_group_full_name}) => journal_group_full_name.split('-')?.[1]?.[0]));
    },[groups]);

    return {loading,groups,groupesByGrade}
}