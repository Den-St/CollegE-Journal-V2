import { useStudentJournalSubjectsStore } from './../store/studentJournalSubjects';
import { useEffect } from 'react';
import { useState } from 'react';
import { endpoints } from './../consts/endpoints';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from './../store/userStore';
import { StudentJournalSubjectsT } from '../types/studentJournalSubjects';

export const useStudentSubjects = () => {
    const localToken = useUserStore().user.token;
    const [loading,setLoading] = useState(false);
    const setSubjects = useStudentJournalSubjectsStore().set;
    const journalSubjects = useStudentJournalSubjectsStore().journalSubjects;

    const fetch = async () => {
        if(journalSubjects.subjects.length) return;
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.studentGroupSubjects,{headers:{Authorization:localToken}});
            setSubjects(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetch();
    },[]);

    return {journalSubjects,loading};
}