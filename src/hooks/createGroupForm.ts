import { GroupT } from './../types/group';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { routes } from "../consts/routes";
import { getToken } from "../helpers/auth";
import { useAdminGroupsStore } from "../store/adminGroupsStore";
import { useUserStore } from "../store/userStore";
import { CreateGroupT } from "../types/group";
import { validGroupPrefixes } from '../consts/validGroupPrefixes';

export const useCreateGroupForm = (refetchGroups:() => void) => {
    const navigate = useNavigate();
    const [createGroupModalOpened,setCreateGroupModalOpened] = useState(false);
    const [errorCode,setErrorCode] = useState<number>();
    const addGroup = useAdminGroupsStore().addGroup;

    const onOpenCreateGroupModal = () => {
        setCreateGroupModalOpened(true);
    }
    const onCloseCreateGroupModal = () => {
        setCreateGroupModalOpened(false);
    }
    const {
        register,
        handleSubmit,
    } = useForm<CreateGroupT>();

    const localToken = useUserStore().user.token;
    const validateGroupName = (group_full_name:string) => {
        group_full_name = group_full_name.trim();
        if(group_full_name.length !== 4 && group_full_name.length !== 5) {
            setErrorCode(-1);
            return;
        }
        const oneLetterNameCondition = group_full_name[0].match(/^[А-Я]/u) && group_full_name[1] === '-' && !isNaN(+group_full_name[2]) && !isNaN(+group_full_name[3]) && +group_full_name[2] > 0 && +group_full_name[2] < 5 && +group_full_name[3] > 0 && +group_full_name[3] < 5 && validGroupPrefixes.includes(group_full_name[0]);
        if(group_full_name.length === 4 && !oneLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        const doubleLetterNameCondition = group_full_name[0].match(/^[А-Я]/u) && group_full_name[1].match(/^[а-я]/u) && group_full_name[2] === '-' && !isNaN(+group_full_name[3]) && !isNaN(+group_full_name[4]) && +group_full_name[3] > 0 && +group_full_name[3] < 5 && +group_full_name[4] > 0 && +group_full_name[4] < 5 && validGroupPrefixes.includes(group_full_name[0] + group_full_name[1]);
        if(group_full_name.length === 5 && !doubleLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        setErrorCode(undefined);
    }
    const onCreateGroup = async (data:CreateGroupT) => {
        data.group_full_name = data.group_full_name.trim();
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
            const res = await axiosConfig.post(endpoints.createGroup,data,{headers:{'Authorization':localToken}});
            onCloseCreateGroupModal();
            // refetchGroups();
            if(res.status === 201) {
                setErrorCode(undefined);
                addGroup({group_id:res.data.inserted_id,group_full_name:data.group_full_name});
                navigate(routes.editGroup.replace(':id',res.data.inserted_id))
            }else{
                setErrorCode(res.data.status)
            }
        }catch(err){
            setErrorCode(0);
            console.error(err);
        }
    }
    return {validateGroupName,createGroupModalOpened,onCloseCreateGroupModal,onOpenCreateGroupModal,handleSubmit,register,onCreateGroup,errorCode};
}
