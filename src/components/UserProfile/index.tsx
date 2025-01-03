import { Select } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { EditProfileSvg } from "../../assets/svgs/editProfileSvg";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { StarSvg } from "../../assets/svgs/starSvg";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { useGetUserProfile } from "../../hooks/getUserProfile";
import { useGroupsByTeacher } from "../../hooks/groupsByTeacher";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import { UserProfileT } from "../../types/userProfile";
import { Loader } from "../Loader/Loader";
import '../MyProfile/studentProfile.scss';
const {Option} = Select;

const useEditLessonGroups = (user:UserProfileT | undefined) => {
    const [isOnEditingLG,setIsOnEditingLG] = useState(false);
    const [lg,setLg] = useState<{phisicaledu:'Основна' | 'Додаткова' | null | undefined,germany:boolean | null | undefined,english:"Підгрупа А" | "Підгрупа Б" | null | undefined,english_additional:boolean | null | undefined}>({phisicaledu:user?.phisicaledu,english:user?.english,english_additional:user?.english_additional,germany:user?.germany});
    const token = useUserStore().user.token;
    const user_id = useParams().id;

    const onToggleEditLG = () => {
        setIsOnEditingLG(prev => !prev);
    }
    const onConfirmLGChange = async () => {
        try{
            const res = await axiosConfig.put(endpoints.changeLG,{...lg,user_id},{headers:{Authorization:token}});
            setIsOnEditingLG(false);
        }catch(err){
            console.error(err);
        }
    }

    const onChangeLG = (type:'phisicaledu' | 'germany' | 'english' | 'english_additional',value:string | boolean) => {
        setLg(prev => ({...prev,[type]:value}))
    }

    useEffect(() => {
        setLg({english:user?.english,english_additional:user?.english_additional,germany:user?.germany,phisicaledu:user?.phisicaledu});
    },[user]);

    return {onToggleEditLG,isOnEditingLG,onChangeLG,lg,onConfirmLGChange};
}


export const UserProfile = () => {
    const theme = useThemeStore().theme;
    const mySecurityLevel = useUserStore().user.security_level;
    const from = useSearchParams()[0].get('from');
    const navigate = useNavigate();
    const {user_id,user,loading} = useGetUserProfile();
    const {onToggleEditLG,isOnEditingLG,onChangeLG,lg,onConfirmLGChange} = useEditLessonGroups(user);
    const {groups} = useGroupsByTeacher();
    const isSupervisor = groups.find(group => group.journal_group === user?.user_group?.group_id)?.is_supervisor;

    if(loading) return <Loader/>
    return <div className={`studentProfile__container ${theme}`} style={{'alignItems':'flex-start',paddingLeft:mySecurityLevel !== securityLevels.admin ? '200px' : '7%'}}>
        <section className='studentProfileMain__container'>
            <div style={{display:'flex',flexDirection:'column',gap:'30px',width:'100%'}}>
                <LinkBack title={user?.user_type === "teacher" ? "Cписок викладачів" : "Список студентів"} goTo={() => !!from ? navigate(from) : navigate(-1)}/>
                {/* <h2 className="subjectsMainTitle"><button onClick={() => !!from ? navigate(from) : navigate(-1)} className={'leftArrowButton'}><LeftArrowSvg/></button>Список студентів</h2> */}
                <div style={{display: 'flex',width: '100%',justifyContent: 'space-between'}}>
                    <div style={{'display':'flex','flexDirection':'column','gap':'60px'}}>
                    {user?.user_type === "teacher" &&<h1 className="header">Профіль викладача</h1>}
                    {user?.user_type === "student" && <h1 className="header">Профіль cтудента</h1>}
                    <div className='studentProfileLeft__container'>
                        <div className='studentProfileInfo__container'>
                            <img className='studentProfile_img' src={
                                user?.avatar || 
                                defaultAvatar
                            }/>
                            <div className='studentProfileTextInfo__container'>
                                <p className='studentProfile__name'>
                                    {user?.full_name + ' '}
                                    {/* {user.security_level !== securityLevels.admin &&  */}
                                    {/* {user?. <StarSvg/> */}
                                    {mySecurityLevel === securityLevels.admin && !!user_id && 
                                    <Link to={routes.editUser.replace(':id',user_id)} className='editUserProfile_button'><EditProfileSvg/></Link>}
                                </p>
                                {/* {
                                !!user?.user_group?.group_full_name && 
                                mySecurityLevel === securityLevels.admin || mySecurityLevel === securityLevels.teacher
                                ? <Link to={routes.pickJournalSubject} className='studentProfile__group'>
                                    {user?.user_group?.group_full_name}
                                    </Link> 
                                : <p className='studentProfile__group'>
                                    {user?.user_group?.group_full_name}
                                </p>} */}
                                <p className='studentProfile__group'>
                                    {user?.user_group?.group_full_name}
                                </p>
                                <p className='studentProfile__bio'>
                                    {user?.interests}
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                    {
                    mySecurityLevel === securityLevels.admin && user?.user_type === "student" 
                    && <div style={{'display':'flex','flexDirection':'column','gap':'60px','maxWidth':'500px',width:'50%'}}>
                        <div style={{'display':'flex','gap':'30px',alignItems:'center'}}>
                            <h2 className="header">Додаткова інформація</h2>
                            {(mySecurityLevel === securityLevels.admin) && <button className={`editUserProfile_button ${isOnEditingLG && `onEditing`}`} style={{'fill':isOnEditingLG ? 'orange' : 'gray'}} onClick={onToggleEditLG}><EditProfileSvg/></button>}
                            {(mySecurityLevel === securityLevels.admin && isOnEditingLG) && <button className={'primary_button'} onClick={onConfirmLGChange}>Збер.</button>}
                        </div>
                        <div className="studentProfile_editLessonGroups_container">
                            <div style={{'display':'flex','flexWrap':'wrap','justifyContent':'space-between','rowGap':'30px',}}>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Англ. Мова підгрупа</h3>
                                    {!isOnEditingLG ? <p className="subHeader">{lg.english || 'Не обрано'}</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('english',e)}
                                        value={lg.english}
                                        >
                                        <Option value={"Підгрупа А"} label={"Підгрупа А"}>Підгрупа А</Option>
                                        <Option value={"Підгрупа Б"} label={"Підгрупа Б"}>Підгрупа Б</Option>
                                    </Select>}
                                </div>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Фіз-культура група</h3>
                                    {!isOnEditingLG ? <p className="subHeader">{lg.phisicaledu || 'Не обрано'}</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('phisicaledu',e)}
                                        value={lg.phisicaledu}
                                        >
                                        <Option value={"Основна"} label={"Основна"}>Основна</Option>
                                        <Option value={"Додаткова"} label={"Додаткова"}>Додаткова</Option>
                                    </Select>}
                                </div>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Спец. куср Англ. мови</h3>
                                    {!isOnEditingLG ? <p className="subHeader">{lg.english_additional === true ? "Вивчає" : lg.english_additional === false ? "Не вивчає" : 'Не обрано'}</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('english_additional',e)}
                                        value={lg.english_additional}
                                        >
                                        <Option value={true} label={"Вивчає"}>Вивчає</Option>
                                        <Option value={false} label={"Не вивчає"}>Не вивчає</Option>
                                    </Select>}
                                </div>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Німецька мова</h3>
                                    {!isOnEditingLG ? <p className="subHeader">{lg.germany === true ? "Вивчає" : lg.germany === false ? "Не вивчає" : 'Не обрано'}</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('germany',e)}
                                        value={lg.germany}
                                        >
                                        <Option value={true} label={"Вивчає"}>Вивчає</Option>
                                        <Option value={false} label={"Не вивчає"}>Не вивчає</Option>
                                    </Select>}
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </section>
        {(mySecurityLevel === securityLevels.admin || isSupervisor) && user?.user_type === "student" ?
        <section className='profile_detailedInfo_section'>
            <div className='profile_detailedInfo_dir_container'>
                <h1 className='profile_detailedInfo_dir_header'>Інформація про студента</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Пошта студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.mailbox_address}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Номер студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.phone_number}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата народження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{!!user?.birth_date && new Date(user.birth_date * 1000).toLocaleString().split(', ')[0]}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Місце знаходження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.location}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Номер батьків</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.parents_phone_number}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Отримання стипендії</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.is_on_scholarships ? 'Отримує стипендію' : 'Не отримує стипендію'}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Форма навчання</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.education_form}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Бюджет/Контракт</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.education_type}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата вступу</h2>
                    <h2 className='profile_detailedInfo_item_text'>{!!user?.admission_date && new Date(user.admission_date * 1000).toLocaleString().split(', ')[0]}</h2>
                </div>
            </div>
            <div className='profile_detailedInfo_dir_container' style={{flexDirection:'column'}}>
                <h1 className='profile_detailedInfo_dir_header'>Важливо</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Цю інформацію не бачать інші студенти, також ви не можете цю інформацію самостійно редагувати</h2>
                </div>
            </div>
        </section>
        : mySecurityLevel === securityLevels.admin && user?.user_type === "teacher" && <section className='profile_detailedInfo_section'>
        <div className='profile_detailedInfo_dir_container'>
            <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                <h1 className='profile_detailedInfo_dir_header'>Інформація про викладача</h1>
                <div className='profile_detailedInfo_dir_container'>
                    <div className='profile_detailedInfo_itemContainer'>
                        <h2 className='profile_detailedInfo_item_header'>Пошта викладача</h2>
                        <h2 className='profile_detailedInfo_item_text'>{user?.mailbox_address}</h2>
                    </div>
                    <div className='profile_detailedInfo_itemContainer'>
                        <h2 className='profile_detailedInfo_item_header'>Номер викладача</h2>
                        <h2 className='profile_detailedInfo_item_text'>{user?.phone_number}</h2>
                    </div>
                    <div className='profile_detailedInfo_itemContainer'>
                        <h2 className='profile_detailedInfo_item_header'>Посада</h2>
                        <h2 className='profile_detailedInfo_item_text'>{user?.job_title}</h2>
                    </div>
                    <div className='profile_detailedInfo_itemContainer'>
                        <h2 className='profile_detailedInfo_item_header'>Додаткова посада</h2>
                        <h2 className='profile_detailedInfo_item_text'>{user?.additional_job_title}</h2>
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
    </section>
        }
    </div>
}