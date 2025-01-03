import { Link } from "react-router-dom";
import { defaultAvatar } from "../../consts/defaultAvatar"
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { useGetTeachers } from "../../hooks/getTeachers";
import { useUserStore } from "../../store/userStore";
import { Loader } from "../Loader/Loader";
import "./teachersStyles.scss";

export const Teachers = () => {
    const mySecurityLevel = useUserStore().user.security_level || 0;
    const {teachersByDepartment,loading} = useGetTeachers();

    if(loading) return <Loader/>

    return <div className="teachersMain_container">
        <div className="teachersHeader_container">
            <div className="teachersHeaderLeft_container">
                <h1 className="teachersHeader">Викладачі</h1>
                {mySecurityLevel >= securityLevels.teacher && <Link to={routes.groups} className={'teachersGoToGroups_link'}>Список груп</Link>}
            </div>
            <div className="teachersHeaderRight_container">
                {mySecurityLevel === securityLevels.admin && <>
                    <Link to={'#'} className="adminPanelStudentList_add primary_button">Видалити викладача</Link>
                    <Link to={routes.createTeacher} className="adminPanelStudentList_add primary_button">Додати викладача</Link>
                </>
                }
            </div>
        </div>
        <div className="teachersSections_container">
            {teachersByDepartment && Object.keys(teachersByDepartment).map(key => 
                <div id={key} className="teacherSectionItem_container">
                    <h2 className="teacherSection_header">{key}</h2>
                    <div className="teachers_container">
                        {teachersByDepartment[key].map(teacher => 
                            <div id={teacher.user_id} className="teacherItem_container">
                                <img className="teacherAvatar" src={teacher.avatar || defaultAvatar}/>
                                <div className="teacherItemText_container">
                                    <p className="teacherItem_name">{teacher.full_name}</p>
                                    <p className="teacherItem_role">Викладач</p>
                                </div>
                            </div>    
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
}