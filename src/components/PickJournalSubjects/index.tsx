import { securityLevels } from "../../consts/securityLevels";
import { useUserStore } from "../../store/userStore";
import { StudentSubjects } from "./StudentSubjects";
import { TeacherSubjects } from "./TeacherSubjects";

export const PickJournalSubjects = () => {
    const userSecurityLevel = useUserStore().user.security_level;

    if(!userSecurityLevel) return <></>
    if(userSecurityLevel === securityLevels.student) return <StudentSubjects/>
    if(userSecurityLevel > securityLevels.student) return <TeacherSubjects/>
    return <></>
}