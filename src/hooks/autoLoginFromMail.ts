import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useAutoLoginFromMail = (onLogin:(data: {
        mailbox_address: string;
        user_password: string;
    }) => Promise<void>) => {
    const [searchParams,setSearchParams] = useSearchParams();
    const mailbox_address = searchParams.get('mailbox_address');
    const user_password = searchParams.get('password');

    useEffect(() => {
        if(mailbox_address && user_password){
            onLogin({mailbox_address,user_password});
        }
    },[]);

    return {autoLoginMailData:{mailbox_address,user_password}}
}