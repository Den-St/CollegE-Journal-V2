import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { routes } from '../../consts/routes';
import { securityLevels, securityLevelsToNames } from '../../consts/securityLevels';
import { deleteTokenCookie } from '../../helpers/auth';
import { useStudentJournal } from '../../hooks/studentJournal';
import { useThemeController } from '../../hooks/themeController';
import { useAdminGroupsStore } from '../../store/adminGroupsStore';
import { useStudentJournalSubjectsStore } from '../../store/studentJournalSubjects';
import { useTeachersGroupsStore } from '../../store/teachersGroupsStore';
import { useUserStore } from '../../store/userStore';
import './userPopupStyles.scss';

export const UserPopup = () => {
    const theme = useThemeController().theme;
    const user = useUserStore().user;
    const signOut = useUserStore().signOut;
    const clearTeacherJournal = useTeachersGroupsStore().clear;
    const clearStudentJournal = useStudentJournalSubjectsStore().clear;
    const clearAdminGroupStore = useAdminGroupsStore().clear;
    const navigate = useNavigate();
    const onSignOut = () => {
        signOut();
        clearTeacherJournal();
        clearStudentJournal();
        deleteTokenCookie();
        clearAdminGroupStore();
        navigate(routes.signIn);
    }

    return <div className={`userPopup_container ${theme}`}>
        <div className='userInfoPopup_container'>
            <img className='header_avatar' src={user.avatar || defaultAvatar} style={{marginBottom:'10px'}}/>
            <p className='userFullName'>{user.full_name}</p>
            <p className='userEmail'>{user.mailbox_address}</p>
            <p className='userEmail'>{user?.user_group?.group_full_name}</p>
            <p className='userRole'>{securityLevelsToNames[user.security_level || 0]}</p>
        </div>
        <div className='userInfoPopupLinks_container'>
            <h6 className='userInfoPopupLinks_header'>кабінет</h6>
            {user.security_level === securityLevels.admin  
            ? <Link to={routes.adminPanel + '?section=schedule'} className='userPopupSignOut_button'>Кабінет адміністратора</Link> 
            : <Link to={routes.myProfile} className='userPopupSignOut_button'>Особистий кабінет</Link>}
            <button className='userPopupSignOut_button' onClick={onSignOut}>Вийти з акаунту</button>
        </div>
    </div>
}