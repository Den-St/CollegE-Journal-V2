import { useUserStore } from './../store/userStore';
import { endpoints } from './../consts/endpoints';
import { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

export const useJournalTeacherSettings = (journal_id:string) =>{
    const [teachers,setTeachers] = useState<{full_name:string,user_id:string}[]>([]);
    const [loading,setLoading] = useState(false);
    const token = useUserStore().user.token;
    const [addTeacher,setAddTeacher] = useState();
    const [shiftTeacher,setShiftTeacher] = useState();

    const fetch = async () => {
        try{
            setLoading(true);
            const res = await axiosConfig.get(endpoints.getJournalTeachers,{headers:{'Authorization':token}});
            setTeachers(res.data.teachers);
            setLoading(false);
        }catch(err){
            console.error(err)
        }
    }
    useEffect(() => {
        fetch();
    },[]);

    const onAddTeacher = async () => {
        try{
            setLoading(true);
            const res = await axiosConfig.post(endpoints.addTeacherToJournal,{journal_id,user_id:addTeacher},{headers:{'Authorization':token}});
            setLoading(false);
        }catch(err){
            console.error(err);
        }
    }

    const onShiftTeacher = async () => {
        try{
            const res = await axiosConfig.post(endpoints.shiftTeacherJournal,{journal_id,user_id:shiftTeacher},{headers:{'Authorization':token}})
        }catch(err){
            console.error(err)
        }
    }

    return {teachers,loading,onAddTeacher,onShiftTeacher,setShiftTeacher,addTeacher,setAddTeacher,shiftTeacher};
}
