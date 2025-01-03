import { Button, Modal, Popover, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DiagonalArrowSvg } from '../../assets/svgs/diagonalArrowSvg';
import { EditProfileSvg } from '../../assets/svgs/editProfileSvg';
import axiosConfig from '../../axiosConfig';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { endpoints } from '../../consts/endpoints';
import { routes } from '../../consts/routes';
import { securityLevels } from '../../consts/securityLevels';
import { useThemeStore } from '../../store/themeStore';
import { useUserStore } from '../../store/userStore';
import { TeacherSchedule } from './LessonsSchedule';
import { LessonsScheduleStudents } from './LessonsSchedule/studentSchedule';
import './studentProfile.scss';
import "./../EditProfile/editProfileStyles.scss";
import { ToggleHidePasswordEye } from '../../assets/svgs/toogleHidePasswordEye';
import {EyeOutlined} from "@ant-design/icons";
import { scheduleTimings } from '../../consts/scheduleTimings';
import { useChangePassword } from '../../hooks/changePassword';
import { PasswordInfo } from '../PasswordInfo';
import { QuestionMarkSvg } from '../../assets/svgs/questionMarkSvg';
import { passwordPattern } from '../../helpers/passwordPattern';
import AntdImgCrop from 'antd-img-crop';


const useChangeAvatar = () => {
    const user = useUserStore().user;
    const setAvatar = useUserStore().setAvatar;
    const [status,setStatus] = useState<number>();
    const [isOnAvatarChange,setIsOnAvatarChange] = useState(false);
    const [newAvatarUrl,setNewAvatarUrl] = useState('');

    const onChangeAvatar = async (avatar:File) => {
        try{
            if(avatar instanceof File){
                const reader = new FileReader();
                reader.readAsDataURL(avatar);
                reader.onload = async (result) => {await axiosConfig.post(endpoints.changeAvatar,{avatar:result.target?.result},{headers:{Authorization:user.token}});setAvatar(result.target?.result?.toString() || user.avatar);}
            }else{
                await axiosConfig.post(endpoints.changeAvatar,{avatar:'google'},{headers:{Authorization:user.token}});
                setAvatar('');
            }
        }catch(err){
            console.error(err);
        }
    }

    //@ts-ignore
    const beforeUpload = (file) => {
        onChangeAvatar(file);
        setNewAvatarUrl(URL.createObjectURL(file));
    };

    return {setIsOnAvatarChange,isOnAvatarChange,beforeUpload}
}

export const MyProfile = () => {
    const studentLinks = [
        {
            label:'Перегляд оцінок',
            link:routes.pickJournalSubject
        },
        {
            label:'Домашнє завдання',
            link:'#'
        },
    ];
    
    const teacherLinks = [
        {
            label:'Журнал оцінок',
            link:routes.groups
        },
        {
            label:'Завантажити завдання',
            link:'#'
        },
    ];
    const [onTryEditing,setOnTryEditing] = useState(false);
    const {setIsOnAvatarChange,isOnAvatarChange,beforeUpload} = useChangeAvatar();
    const [avatarHovered,setIsAvatarHovered] = useState(false);
    const theme = useThemeStore().theme;
    const user = useUserStore().user;
    
    
    useEffect(() => {
        document.title = 'Мій профіль';
    },[]);
    
    return <div className={`studentProfile__container ${theme}`}>
        <section className='studentProfileMain__container'>
            <div className='studentProfileLeft__container'>
                <div className='studentProfileInfo__container'>
                    <AntdImgCrop showReset  resetText="Відмінити зміни" rotationSlider showGrid modalTitle="Обробка фото" modalOk="Підтвердити" modalCancel="Відмінити">
                        <Upload  beforeUpload={beforeUpload}  accept="image/png, image/jpeg">
                            <div className='avatarEdit_container'>
                                <img className='studentProfile_img profileAvatar_edit' src={user.avatar || defaultAvatar}/>
                                <div className='avatarEdit'><EditProfileSvg/></div>
                            </div>
                        </Upload>
                    </AntdImgCrop>
                    <div className='studentProfileTextInfo__container'>
                        <div className='studentProfile__name_container'>
                            <p className='studentProfile__name'>{user.full_name}</p>
                            <button className='primary_button' onClick={() => setOnTryEditing(true)}>Змінити пароль</button>
                        </div>
                        {!!user?.user_group?.group_full_name && 
                        user.security_level === securityLevels.student
                        ? <Link to={routes.myGroup} className='studentProfile__group'>{user?.user_group?.group_full_name}</Link>
                        : (user.security_level === securityLevels.teacher || user.security_level === securityLevels.admin) && <Link to={routes.pickJournalSubject+`?group_id=${user?.user_group?.group_id}`} className='studentProfile__group'>{user?.user_group?.group_full_name}</Link> 
                        }
                    </div>
                </div>
                <div className='studentProfileTabs__container'>
                    {user.security_level === securityLevels.student ? studentLinks.map((link) =>
                        <Link to={link.link} key={link.label} className={`studentProfileTab__button`}>
                                {link.label} {DiagonalArrowSvg()}
                        </Link>)
                    : teacherLinks.map((link) =>
                        <Link to={link.link} key={link.label} className={`studentProfileTab__button`}>
                            {link.label} {DiagonalArrowSvg()}
                        </Link>)}
                </div>
            </div>
            {user.security_level === securityLevels.student ? <></>
                :   <div className='lessonsScheduleDayLessons__container'>
                    <h1 className='header' style={{'marginBottom':'10px'}}>Час проведення пар</h1>
                    <div className="lessonsScheduleDayLessonItem__container">
                        <p className="lessonsScheduleLessonNumber"></p>
                        <p className="lessonsScheduleLessonStart">Початок</p>
                        <p className="lessonsScheduleLessonEnd">Кінець</p>
                    </div>
                    {scheduleTimings.map((timing,i) => 
                        <div key={timing.id} className="lessonsScheduleDayLessonItem__container">
                            <p className="lessonsScheduleLessonNumber">{i + 1}</p>
                            <p className="lessonsScheduleLessonStart" style={{width:'100px'}}>{timing.start}</p>
                            <p className="lessonsScheduleLessonEnd">{timing.end}</p>
                        </div>
                    )}
                </div>
                }
        </section>
        {user.security_level === securityLevels.student ? <LessonsScheduleStudents/> : <TeacherSchedule/>}
        {user.security_level === securityLevels.student && 
        <section className='profile_detailedInfo_section'>
            <div className='profile_detailedInfo_dir_container'>
            <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                <h1 className='profile_detailedInfo_dir_header'>Інформація про студента</h1>
                <div className='profile_detailedInfo_dir_container'>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Пошта студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.mailbox_address}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Номер студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.phone_number}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата народження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.birth_date?.toLocaleString().split(',')[0] || ''}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Місце знаходження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.location}</h2>
                </div>
                {/* <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Отримання стипендії</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.}</h2>
                </div> */}
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Форма навчання</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.education_form}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Бюджет/Контракт</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.education_type}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата вступу</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.admission_date?.toLocaleString().split(',')[0] || ''}</h2>
                </div>
                </div>
                </div>
            </div>
            <div className='profile_detailedInfo_dir_container_important' style={{flexDirection:'column'}}>
                <h1 className='profile_detailedInfo_dir_header'>Важливо</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Цю інформацію не бачать інші студенти, також ви не можете цю інформацію самостійно редагувати</h2>
                </div>
            </div>
        </section>}
        {user.security_level === securityLevels.teacher && 
        <section className='profile_detailedInfo_section'>
            <div className='profile_detailedInfo_dir_container'>
                <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                    <h1 className='profile_detailedInfo_dir_header'>Інформація про викладача</h1>
                    <div className='profile_detailedInfo_dir_container'>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Пошта викладача</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.mailbox_address}</h2>
                        </div>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Номер викладача</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.phone_number}</h2>
                        </div>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Посада</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.job_title}</h2>
                        </div>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Додаткова посада</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.additional_job_title}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile_detailedInfo_dir_container_important' style={{flexDirection:'column'}}>
                <h1 className='profile_detailedInfo_dir_header'>Важливо</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Цю інформацію не бачать інші студенти, також ви не можете цю інформацію самостійно редагувати</h2>
                </div>
            </div>
        </section>}
        {onTryEditing && <ChangePasswordModal onTryEditClose={() => setOnTryEditing(false)}/>}
    </div>
}

type Props = {
    onTryEditClose:() => void
}
const ChangePasswordModal:React.FC<Props> = ({onTryEditClose}) => {
    const {onSubmit,register,handleSubmit,formError,user,errors,passwordInputType,onTogglePassword,watch} = useChangePassword(onTryEditClose);
    
    return <Modal centered open onCancel={onTryEditClose} footer={false} rootClassName={'tryEditProfileModal'}>
        <div className="editProfileModal_container">
            <h1 className="editProfileModal_header">{user.is_active ? `Форма зміни паролю` : 'Для активації особового запису потрібно змінити пароль'}</h1>
            <form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)} className="editProfileModal_form">
            {user.is_active && <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                <h2 className='subHeader'>Поточний пароль</h2>
                <div style={{display:'flex',gap:'20px',width:'100%',position:'relative'}}>
                        <input style={{width:"100%"}} {...register('old_password',{required:{value:user.is_active,'message':'Введіть поточний пароль'},minLength:{value:8,message:'Пароль має бути не меншим за 8 символів!'},maxLength:{value:30,message:'Пароль має бути не більшим за 30 символів!'},pattern:{value:passwordPattern,message:'На жаль дані введені не корректно, перевірте їх та спробуйте ще раз!'}})} placeholder="Введіть теперішній пароль" className="input" type={passwordInputType[1]}/>
                        <span onClick={() => onTogglePassword(1)} style={{'position':'absolute','right':'25px','top':'22px','width':'unset'}} className='passwordEye__button'>{passwordInputType[1] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{fontSize:'17px'}} />}</span>
                    </div>
                    {!!errors.old_password?.message && <p className="signIn_errorMessage">{errors.old_password.message}</p>}
                </div>}
                <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                    <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                        <div style={{'display':'flex','gap':'40px'}}>
                            <h2 className='subHeader'>
                                Новий пароль 
                            </h2>
                            <Popover rootClassName="passwordInfo_popover" placement={'top'} content={<PasswordInfo/>}><div style={{width:'20px',height:'20px'}} className={`questionMark_container ${!!errors.new_password?.message ? 'active' : ''}`}><QuestionMarkSvg/></div></Popover>
                        </div>
                        <div style={{display:'flex',gap:'20px',width:'100%',position:'relative'}}>
                            <input style={{width:"100%"}} {...register('new_password',{required:{value:true,"message":'Введіть новий пароль'},minLength:{value:8,message:'Пароль має бути не меншим за 8 символів!'},maxLength:{value:30,message:'Пароль має бути не більшим за 30 символів!'},pattern:{value:passwordPattern,message:'Пароль некоректний'}})} placeholder="Введіть новий пароль" className="input" type={passwordInputType[2]}/>
                            <span onClick={() => onTogglePassword(2)} style={{'position':'absolute','right':'25px','top':'22px','width':'unset'}} className='passwordEye__button'>{passwordInputType[2]  === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{fontSize:'17px'}} />}</span>
                        </div>
                    </div>
                    <div style={{display:'flex',gap:'20px',width:'100%',position:'relative'}}>
                        <input style={{width:"100%"}} {...register('new_password_confimation',{minLength:{value:8,message:'Пароль має бути не меншим за 8 символів!'},maxLength:{value:30,message:'Пароль має бути не більшим за 30 символів!'},pattern:{value:passwordPattern,message:'Пароль некоректний'}})} placeholder="Підтвердіть новий пароль" className="input" type={passwordInputType[3]}/>
                        <span onClick={() => onTogglePassword(3)} style={{'position':'absolute','right':'25px','top':'22px','width':'unset'}} className='passwordEye__button'>{passwordInputType[3] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{fontSize:'17px'}} />}</span>
                    </div>
                </div>
                {!!formError && <p className="signIn_errorMessage">{formError}</p>}
                {!!errors.new_password?.message && <p className="signIn_errorMessage">{errors.new_password.message}</p>}
                {(!!watch('new_password') && watch('new_password') !== watch('new_password_confimation')) && <p className="signIn_errorMessage">Паролі не співпадають</p>}
                <div className="editFormButtons_container">
                    <input style={{'width':'271px'}} autoComplete={"off"} type={'submit'} value={'Далі'} className="primary_button"/>
                    <span style={{'width':'149px','marginRight':'28px'}} className="forgotPassword">Забули пароль?</span>
                </div>
            </form>
            <button className="primary_button" style={{'width':'271px'}} onClick={onTryEditClose}>Повернутися</button>
        </div>
    </Modal>
}