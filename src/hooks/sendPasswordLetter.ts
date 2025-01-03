import { useParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { useUserStore } from "../store/userStore";
import { useNotification } from "./notification";

export const useSendPassword = () => {
    const user_id = useParams().id;
    const token = useUserStore().user.token;
    const {openErrorNotification,openSuccessNotification,contextHolder} = useNotification(
        `Повідомлення надісланно`,
        "Запит на зміну пароля надісланно користувачу",
        "Повідомлення про помилку",
        "Запит на зміну пароля не було надісланно");

    const onSendLetter = async () => {
        try{
            const res = await axiosConfig.put(endpoints.sendLetter,{user_id},{headers:{Authorization:token}});
            openSuccessNotification();
        }catch(err){
            openErrorNotification();
            console.error(err);
        }
    }
    return {onSendLetter,contextHolder}
}