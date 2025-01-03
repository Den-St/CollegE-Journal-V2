import { LessonT } from './../types/lesson';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { GroupT } from "../types/group";

export const useGetGroup = (groupId?:string) => {
    const [loading,setLoading] = useState(false);
    const [group,setGroup] = useState<GroupT>();
    const localToken = useUserStore().user.token;
    const group_id = useParams().id;

    const fetch = async (groupId?:string) => {
        if(!groupId && !group_id) {
            setGroup(undefined);
            return;
        }
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.getGroup,{group_id:group_id || groupId},{headers:{Authorization:localToken}});
            if(Object.keys(res.data.timetable).length && !res.data.timetable[5]){
                res.data.timetable[5] = [
                    {
                        audience:0,
                        lesson_number:0,
                        link:'',
                        subject_name:'',
                        time:'8:00'      
                    },
                    {
                        audience:0,
                        lesson_number:0,
                        link:'',
                        subject_name:'',
                        time:'9:45'      
                    },
                    {
                        audience:0,
                        lesson_number:0,
                        link:'',
                        subject_name:'',
                        time:'11:30'     
                    },
                    {
                        audience:0,
                        lesson_number:0,
                        link:'',
                        subject_name:'',
                        time:'13:15'      
                    },
                    {
                        audience:0,
                        lesson_number:0,
                        link:'',
                        subject_name:'',
                        time:'14:45'      
                    },
                ];
            }
            setGroup(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch(groupId);
    }, [group_id,groupId])
    
    return {group,groupLoading:loading,fetchGroup:fetch}
}
