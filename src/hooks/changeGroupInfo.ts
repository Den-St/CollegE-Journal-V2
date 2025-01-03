import { useTeachersGroupsStore } from './../store/teachersGroupsStore';
import { useGetSupervisors } from './getSupervisors';
import { useEffect } from 'react';
import { SupervisorT } from './../types/supervisor';
import { useState } from 'react';
import { getToken } from './../helpers/auth';
import { endpoints } from './../consts/endpoints';
import { ChangeGroupT, GroupT } from './../types/group';
import { useForm } from "react-hook-form";
import { CreateUserT } from "../types/user";
import axiosConfig from '../axiosConfig';
import { useUserStore } from '../store/userStore';
import { validGroupPrefixes } from '../consts/validGroupPrefixes';
import { useNotification } from './notification';

export const useChangeGroupInfo = (group?:GroupT) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<ChangeGroupT>();
    const localToken = useUserStore().user.token;
    const [chosenSupervisorId,setChosenSupervisorId] = useState<string | null>(null);
    const [incorrectGroupName,setIncorrectGroupName] = useState(false);
    const [changeErrorCode,setErrorCode] = useState<number>();
    const clearJournalGroups = useTeachersGroupsStore().clear; //to clear journal groups after inverting them, so they will be updated

    const {openErrorNotification,openSuccessNotification,contextHolder} = useNotification(
        `Повідомлення про успішне редагування даних про групу`,
        `Ви змінили дані групи ${group?.group_full_name}`,
        `Повідомлення про помилку редагування даних про групу`,
        `Помилка зміни даних про групу ${group?.group_full_name}`);
        
    useEffect(() => {
        if(group?.group_supervisor?.user_id){
            setChosenSupervisorId(group.group_supervisor.user_id);
        }
    },[group]);
    const validateGroupName = (group_full_name:string) => {
        group_full_name = group_full_name.trim();
        if(group_full_name.length !== 4 && group_full_name.length !== 5) {
            setErrorCode(-1);
            return;
        }
        const oneLetterNameCondition = group_full_name[0].match(/^[А-Я]/u) && group_full_name[1] === '-' && !isNaN(+group_full_name[2]) && !isNaN(+group_full_name[3]) && +group_full_name[2] > 0 && +group_full_name[2] < 10 && +group_full_name[3] > 0 && +group_full_name[3] < 10 && validGroupPrefixes.includes(group_full_name[0]);
        if(group_full_name.length === 4 && !oneLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        const doubleLetterNameCondition = group_full_name[0].match(/^[А-Я]/u) && group_full_name[1].match(/^[а-я]/u) && group_full_name[2] === '-' && !isNaN(+group_full_name[3]) && !isNaN(+group_full_name[4]) && +group_full_name[3] > 0 && +group_full_name[3] < 9 && +group_full_name[4] > 0 && +group_full_name[4] < 9 && validGroupPrefixes.includes(group_full_name[0] + group_full_name[1]);
        if(group_full_name.length === 5 && !doubleLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        setErrorCode(0);
    }
    const onChangeGroupInfo = async (data:ChangeGroupT) => {
        if(chosenSupervisorId === group?.group_supervisor?.user_id && group?.group_full_name === data.group_full_name) return;
        data.group_full_name = data.group_full_name.trim() || group?.group_full_name.trim() || '';
        if(data.group_full_name.length !== 4 && data.group_full_name.length !== 5) {
            setErrorCode(-1);
            return;
        }
        const oneLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1] === '-' && !isNaN(+data.group_full_name[2]) && !isNaN(+data.group_full_name[3]) && +data.group_full_name[2] > 0 && +data.group_full_name[2] < 5 && +data.group_full_name[3] > 0 && +data.group_full_name[3] < 5 && validGroupPrefixes.includes(data.group_full_name[0]);
        if(data.group_full_name.length === 4 && !oneLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        const doubleLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1].match(/^[а-я]/u) && data.group_full_name[2] === '-' && !isNaN(+data.group_full_name[3]) && !isNaN(+data.group_full_name[4]) && +data.group_full_name[3] > 0 && +data.group_full_name[3] < 5 && +data.group_full_name[4] > 0 && +data.group_full_name[4] < 5 && validGroupPrefixes.includes(data.group_full_name[0] + data.group_full_name[1]);
        if(data.group_full_name.length === 5 && !doubleLetterNameCondition){
            setErrorCode(-1);
            return;
        }

        try{
            const res = await axiosConfig.post(endpoints.changeGroup,{group_full_name:data.group_full_name,group_id:group?.group_id,group_supervisor:chosenSupervisorId || ''},{headers:{Authorization:localToken}});
            openSuccessNotification();
            setErrorCode(1);
        }catch(err){
            openErrorNotification();
            console.error(err);
        }
    }
    const onChooseSupervisor = (id:string | null) => {
        setChosenSupervisorId(id);
    }

    const onInvertEngGroups = async () => {
        try{
            await axiosConfig.post(endpoints.invertEngGroups,{group_id:group?.group_id},{headers: {Authorization: localToken}});
            clearJournalGroups();
        }catch(err){
            console.error(err);
        }
    }

    return {validateGroupName,incorrectGroupName,changeErrorCode,onChangeGroupInfo,
            changeGroupRegister:register,changeGroupHangeSubmit:handleSubmit,changeGroupSetValue:setValue,
            onChooseSupervisor,chosenSupervisorId,onInvertEngGroups,changeGroupInfoNotification:contextHolder};
}