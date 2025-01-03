import { securityLevels } from "../../consts/securityLevels";
import { useUserStore } from "../../store/userStore"
import { StudentJournal } from "./StudentJournal";
import { TeacherJournal } from "./TeacherJournal";

export const Journal = () => {
    const userSecurityLevel = useUserStore().user.security_level;

    if(!userSecurityLevel) return <></>
    if(userSecurityLevel === securityLevels.student) return <StudentJournal/>
    if(userSecurityLevel > securityLevels.student) return <TeacherJournal/>
    return <></>
}