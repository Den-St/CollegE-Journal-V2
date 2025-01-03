import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type ExpelStudentModalT = {
    date:Date | null,
}

export const useExpelStudentModal = (onClose:() => void) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors},
    } = useForm<ExpelStudentModalT>();
    const user_id = useParams().id;

    const onSubmit = (data:ExpelStudentModalT) => {
        try{
            console.log(data);
        }catch(err){
            console.error(err);
        }finally{
            onClose();
        }
    }

    useEffect(() => {
        setValue('date',new Date())
    },[]);
    return {register,handleSubmit,setValue,watch,errors,onSubmit};
}