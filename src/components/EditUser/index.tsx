import {Select } from "antd";
import { securityLevels } from "../../consts/securityLevels";
import { useGetUserProfile } from "../../hooks/getUserProfile";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import { Loader } from "../Loader/Loader";
import '../MyProfile/studentProfile.scss';
import { EditStudentForm } from "./EditStudentForm";
import { EditTeacherForm } from "./EditTeacherForm";

export const EditUser = () => {
    const theme = useThemeStore().theme;
    const mySecurityLevel = useUserStore().user.security_level;
    const {user,loading} = useGetUserProfile();

    return <div className={`studentProfile__container ${theme}`} style={{'alignItems':'flex-start',paddingLeft:mySecurityLevel !== securityLevels.admin ? '200px' : '7%'}}>
        {loading ? <Loader/> : user && (user?.user_type === "teacher" ? 
        <EditTeacherForm user={user}/>
        :
        <EditStudentForm user={user}/>)
        }
    </div>
}


