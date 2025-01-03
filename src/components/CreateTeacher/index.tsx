import { Select } from "antd";
import { Link } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { emailPattern } from "../../consts/emailPattern";
import { routes } from "../../consts/routes";
import { namePattern } from "../../helpers/namePattern";
import { useCreateTeacher } from "../../hooks/createTeacher";
import { useGetTeachers } from "../../hooks/getTeachers";
import { useThemeStore } from "../../store/themeStore";
import "../EditGroup/editGroupStyles.scss";
import "../Teachers/teachersStyles.scss";

const {Option} = Select;
const userErrorCodesToMessages:Record<number,string> = {
    0:'Користувач з такою поштовою адресою вже існує!'
}
export const CreateTeacher = () => {
    const theme = useThemeStore().theme;
    const {teachersByDepartment,loading,onAddTeacherLocally} = useGetTeachers();
    const {handleSubmit,onCreateUser,createUserErrorCode,createUserFormErrors,createUserRegister,createUserSetValue,createUserWatch,createUserLoading,contextHolder} = useCreateTeacher(onAddTeacherLocally);

    return <div className={`editGroupMain_container ${theme}`}>
        {contextHolder}
        <LinkBack title=""/>
        {/* <h1 className="editGroupHeader"><Link className="editProfile_leaveButton"  to={routes.adminPanel + '?section=groups'}><LeftArrowSvg/></Link>Створення викладача</h1> */}
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="select_label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  
                    {...createUserRegister('full_name',{required:{value:true,message:'Введіть ПІБ викладача!'},minLength:{value:10,message:'ПІБ викладача занадто коротке!'},maxLength:{value:40,message:'ПІБ викладача занадто велике!'},
                    // pattern:{value:namePattern,message:'Некоректне ПІБ!'}
                })} 
                    className="form_input" placeholder='Введіть ПІБ викладача'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="select_label">Пошта викладача</label>
                    <input autoComplete="off" 
                    {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не коректний email!'}})} type={'email'} 
                    className="form_input" placeholder='Введіть пошту викладача'/>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="select_label">Номер викладача</label>
                    <input autoComplete="off" 
                    {...createUserRegister('phone_number',{required:{value:true,message:'Введіть номер викладача!'},minLength:{value:10,message:'Некоректний номер викладача!'},})}
                    className="form_input" placeholder='Введіть номер викладача'/>
                </div>
                <div className="createUserSelect__container" style={{width:'50%'}}>
                    <label className="select_label">Циклова комісія</label>
                    <div className="select_wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть циклову комісію'}
                            optionLabelProp="label"
                            {...createUserRegister('department',{required:true})}
                            onChange={(e) => createUserSetValue('department',e)}
                            value={createUserWatch('department')}
                            >   
                            <Option value={"Циклова комісія іноземних мов"} label={"Циклова комісія іноземних мов"}>Циклова комісія іноземних мов</Option>
                            <Option value={"Циклова комісія інформаційних технологій"} label={"Циклова комісія інформаційних технологій"}>Циклова комісія інформаційних технологій</Option>
                            <Option value={"Циклова комісія гуманітарної та соціально-економічної підготовки"} label={"Циклова комісія гуманітарної та соціально-економічної підготовки"}>Циклова комісія гуманітарної та соціально-економічної підготовки</Option>
                            <Option value={"Циклова комісія телекомунікацій та радіотехніки"} label={"Циклова комісія телекомунікацій та радіотехніки"}>Циклова комісія телекомунікацій та радіотехніки</Option>
                            <Option value={"Циклова комісія природничо-матетматичної підготовки"} label={"Циклова комісія природничо-матетматичної підготовки"}>Циклова комісія природничо-матетматичної підготовки</Option>
                            <Option value={"Інше"} label={"Інше"}>Інше</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
            <div className="createUserSelect__container" style={{width:'45%'}}>
                    <label className="select_label">Посада</label>
                    <div className="select_wrapper">
                        {/* <Select
                            className="createUserSelect"
                            placeholder={'Оберіть посаду викладача'}
                            optionLabelProp="label"
                            {...createUserRegister('job_title',{required:false})}
                            onChange={(e) => createUserSetValue('job_title',e)}
                            value={createUserWatch('job_title')}
                            defaultValue={'Тестова посада'}
                            >   
                            <Option value={"Тестова посада"} label={"Тестова посада"}>Тестова посада</Option>
                        
                        </Select> */}
                         <input autoComplete="off" 
                            {...createUserRegister('job_title',{required:false,})}
                            className="form_input" placeholder='Введіть посаду викладача'/>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'55%'}}>
                    <label className="select_label">Додаткова посада</label>
                    <div className="select_wrapper">
                        {/* <Select
                            className="createUserSelect"
                            placeholder={'Оберіть додаткову посаду викладача'}
                            optionLabelProp="label"
                            {...createUserRegister('additional_job_title',{required:false})}
                            onChange={(e) => createUserSetValue('additional_job_title',e)}
                            value={createUserWatch('additional_job_title')}
                            >   
                            <Option value={"Додаткова посада 1"} label={"Додаткова посада 1"}>Додаткова посада 1</Option>
                            <Option value={"Додаткова посада 2"} label={"Додаткова посада 2"}>Додаткова осада 2</Option>
                        </Select> */}
                         <input autoComplete="off" 
                            {...createUserRegister('additional_job_title',{required:false,})}
                            className="form_input" placeholder='Введіть додаткову посаду викладача'/>
                    </div>
                </div>
            </div>
            {//@ts-ignore
            Object.keys(createUserFormErrors).map(key => !!createUserFormErrors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors[key]?.message}</p>)
            }
            {createUserErrorCode !== undefined && <p style={{width:'fit-content'}} className="signIn_errorMessage">{userErrorCodesToMessages[createUserErrorCode]}</p>}
            <div className="createUserButtons__container">
                <input 
                // disabled={createUserDisabled} 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Зареєструвати"} disabled={createUserLoading}/>
            </div>
        </form>
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
                                <Link className="studentButton" to={routes.editUser.replace(':id',teacher.user_id) + '?from=' + routes.createTeacher}>Редагувати</Link>
                            </div>    
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
}