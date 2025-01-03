import { useEffect } from 'react';
import { endpoints } from './../consts/endpoints';
import { useUserStore } from './../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { myGroupBy } from '../helpers/groupBy';
export type TeacherT = {
    user_id:string,
    full_name:string
    department:string
    avatar:string
}
export const useGetTeachers = () => {
    const [teachersByDepartment,setTeachersByDepartment] = useState<Record<string,TeacherT[]>>({});
    const [loading,setLoading] = useState(false);
    const token = useUserStore().user.token;

    const fetch = async () => {
        try{
            setLoading(true);
            const res = await axiosConfig.get(endpoints.getTeachers,{headers:{Authorization:token}});
            // @ts-ignore
            setTeachersByDepartment(myGroupBy(res.data,({department}) => department));
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    },[]);
    const onAddTeacherLocally = (teacher:TeacherT) => {
        setTeachersByDepartment(prev => ({...prev,[teacher.department]:[...prev[teacher.department],teacher]}));
    }
    return {teachersByDepartment,loading,onAddTeacherLocally};
}