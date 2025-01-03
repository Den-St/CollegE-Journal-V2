import { useGoogleAuthLogin } from "../../hooks/googleAuth";
import { Loader } from "../Loader/Loader";

export const GoogleLogin = () => {
    useGoogleAuthLogin();
    
    return <></>
}